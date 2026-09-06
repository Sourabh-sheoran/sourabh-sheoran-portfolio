import { PROJECTS_DATA, type ProjectItem } from '../data/projectsData';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  topics?: string[];
}

export interface SyncStatus {
  lastSynced: Date | null;
  totalRepos: number;
  isLoading: boolean;
  error: string | null;
}

const CACHE_KEY = 'sourabh_github_repos_cache_v1';
const CACHE_TIME_KEY = 'sourabh_github_repos_timestamp_v1';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes cache to prevent GitHub rate limits

// Format repo names nicely: "instant-mechanic-dashboard" -> "Instant Mechanic Dashboard"
function formatRepoTitle(rawName: string): string {
  return rawName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

// Categorize repo automatically based on language and keywords
function inferCategory(repo: GitHubRepo): 'Web Apps' | 'Dashboards' | 'AI & Full-Stack' {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.language || '').toLowerCase();

  if (name.includes('dashboard') || name.includes('analytics') || name.includes('sales') || name.includes('insight')) {
    return 'Dashboards';
  }

  if (
    lang.includes('python') ||
    lang.includes('jupyter') ||
    name.includes('ai') ||
    name.includes('nlp') ||
    name.includes('ml') ||
    name.includes('extraction') ||
    name.includes('analyzer') ||
    desc.includes('machine learning') ||
    desc.includes('model')
  ) {
    return 'AI & Full-Stack';
  }

  return 'Web Apps';
}

// Select theme colors based on language / category
function inferColors(repo: GitHubRepo): { themeColor: string; glowColor: string } {
  const lang = (repo.language || '').toLowerCase();
  if (lang.includes('python')) {
    return { themeColor: '#10b981', glowColor: 'rgba(16, 185, 129, 0.4)' };
  }
  if (lang.includes('typescript')) {
    return { themeColor: '#38bdf8', glowColor: 'rgba(56, 189, 248, 0.4)' };
  }
  if (lang.includes('javascript')) {
    return { themeColor: '#f59e0b', glowColor: 'rgba(245, 158, 11, 0.4)' };
  }
  if (lang.includes('kotlin')) {
    return { themeColor: '#a855f7', glowColor: 'rgba(168, 85, 247, 0.4)' };
  }
  return { themeColor: '#6366f1', glowColor: 'rgba(99, 102, 241, 0.4)' };
}

// Map raw GitHub Repo to our ProjectItem structure
function convertRepoToProjectItem(repo: GitHubRepo, indexNumber: number): ProjectItem {
  const category = inferCategory(repo);
  const { themeColor, glowColor } = inferColors(repo);
  const title = formatRepoTitle(repo.name);

  // Build tags
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.slice(0, 3));
  }
  tags.push('GitHub Sync');

  // Format updated date (e.g. "Sep 2026")
  const updatedDate = new Date(repo.pushed_at || repo.updated_at);
  const dateStr = updatedDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return {
    id: `gh-${repo.id}`,
    number: String(indexNumber).padStart(2, '0'),
    title,
    category,
    subtitle: `${repo.language || 'Software'} • GitHub Repository`,
    description:
      repo.description ||
      `Open-source project ${repo.name} developed by Sourabh Sheoran on GitHub. Features codebase architecture, version history, and documentation.`,
    tags,
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    themeColor,
    glowColor,
    stats: [
      { label: 'Language', value: repo.language || 'Multi' },
      { label: 'Stars', value: `★ ${repo.stargazers_count}` },
      { label: 'Updated', value: dateStr },
    ],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at || repo.updated_at,
    isGitHubLive: true,
  };
}

export async function fetchUserGitHubProjects(
  username: string = 'Sourabh-sheoran',
  forceRefresh: boolean = false
): Promise<{ projects: ProjectItem[]; rawRepos: GitHubRepo[]; fromCache: boolean }> {
  // 1. Check client-side storage cache unless forceRefresh
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && timestamp) {
        const age = Date.now() - parseInt(timestamp, 10);
        if (age < CACHE_DURATION_MS) {
          const rawRepos = JSON.parse(cached) as GitHubRepo[];
          const merged = mergeProjectsWithGitHub(rawRepos);
          return { projects: merged, rawRepos, fromCache: true };
        }
      }
    } catch {
      // Ignore storage parse errors and proceed to fetch
    }
  }

  // 2. Fetch live from GitHub REST API
  try {
    const url = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const rawRepos: GitHubRepo[] = await res.json();

    // Cache results in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(rawRepos));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch {
        // storage quota fallback
      }
    }

    const merged = mergeProjectsWithGitHub(rawRepos);
    return { projects: merged, rawRepos, fromCache: false };
  } catch (err) {
    console.warn('Could not sync with GitHub API directly, using fallback curated list:', err);
    // Graceful fallback to initial curated projects
    return { projects: PROJECTS_DATA, rawRepos: [], fromCache: false };
  }
}

// Merges curated flagship projects (with custom 3D showroom visuals) with all live GitHub repos
export function mergeProjectsWithGitHub(rawRepos: GitHubRepo[]): ProjectItem[] {
  if (!rawRepos || rawRepos.length === 0) {
    return PROJECTS_DATA;
  }

  // Clone curated projects as our base flagship projects
  const merged: ProjectItem[] = PROJECTS_DATA.map((p) => ({ ...p }));

  let nextIndex = PROJECTS_DATA.length + 1;

  for (const repo of rawRepos) {
    const cleanUrl = repo.html_url.toLowerCase().trim().replace(/\/+$/, '');
    
    // Check if repo matches an existing curated project
    const matchingCurated = merged.find(
      (p) => p.repoUrl.toLowerCase().trim().replace(/\/+$/, '') === cleanUrl
    );

    if (matchingCurated) {
      // Enrich curated project with live stars, live demo if present, and updated stats
      matchingCurated.stars = repo.stargazers_count;
      matchingCurated.forks = repo.forks_count;
      matchingCurated.updatedAt = repo.pushed_at || repo.updated_at;
      matchingCurated.isGitHubLive = true;
      if (repo.homepage && !matchingCurated.liveUrl) {
        matchingCurated.liveUrl = repo.homepage;
      }
    } else {
      // Add as newly discovered live GitHub repository
      const newItem = convertRepoToProjectItem(repo, nextIndex);
      merged.push(newItem);
      nextIndex++;
    }
  }

  return merged;
}
