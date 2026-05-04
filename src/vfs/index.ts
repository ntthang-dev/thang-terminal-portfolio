import type { VFSNode } from './types';
import { personalInfo, education, employment, projects, skills, misc } from '../data/cvData';

const profileContent = `ID: ${personalInfo.name}
Role: Power Systems Engineer & Full-Stack Developer
Location: Ho Chi Minh City, Vietnam
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
GitHub: ${personalInfo.githubUrl}
Clearance: OMNICLASS-9`;

const skillsContent = JSON.stringify(skills, null, 2);

const experienceContent = employment.map(e => 
  `[${e.period}] ${e.role}\nOrganization: ${e.org}\n${e.detail ? 'Details: ' + e.detail : ''}`
).join('\n\n');

const educationContent = education.map(e => 
  `[${e.period}] ${e.degree}\nInstitution: ${e.institution}\nSpecialization: ${e.specialization}\nGPA: ${e.gpa}\n\nHighlights:\n${e.highlights.map(h => '  - ' + h).join('\n')}`
).join('\n\n');

const awardsContent = misc.map(m => 
  `[${m.year}] ${m.title}\n${m.org ? 'Org: ' + m.org : ''}\n${m.field ? 'Field: ' + m.field : ''}\nDetail: ${m.detail}`
).join('\n\n');

export const vfsRoot: VFSNode = {
  name: '/',
  type: 'dir',
  permissions: 'drwxr-xr-x',
  owner: 'root',
  group: 'root',
  size: 4096,
  updatedAt: 'May 04 10:00',
  children: {
    home: {
      name: 'home', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', size: 4096, updatedAt: 'May 04 10:00',
      children: {
        ntthang: {
          name: 'ntthang', type: 'dir', permissions: 'drwxr-x---', owner: 'ntthang', group: 'ntthang', size: 4096, updatedAt: 'May 04 10:00',
          children: {
            cv: {
              name: 'cv', type: 'dir', permissions: 'drwxr-xr-x', owner: 'ntthang', group: 'ntthang', size: 4096, updatedAt: 'May 04 10:00',
              children: {
                'profile.txt': { name: 'profile.txt', type: 'file', content: profileContent, permissions: '-rw-r--r--', owner: 'ntthang', group: 'ntthang', size: profileContent.length, updatedAt: 'May 04 10:00' },
                'skills.json': { name: 'skills.json', type: 'file', content: skillsContent, permissions: '-rw-r--r--', owner: 'ntthang', group: 'ntthang', size: skillsContent.length, updatedAt: 'May 04 10:00' },
                'experience.log': { name: 'experience.log', type: 'file', content: experienceContent, permissions: '-rw-r--r--', owner: 'ntthang', group: 'ntthang', size: experienceContent.length, updatedAt: 'May 04 10:00' },
                'education.txt': { name: 'education.txt', type: 'file', content: educationContent, permissions: '-rw-r--r--', owner: 'ntthang', group: 'ntthang', size: educationContent.length, updatedAt: 'May 04 10:00' },
                'awards.log': { name: 'awards.log', type: 'file', content: awardsContent, permissions: '-rw-r--r--', owner: 'ntthang', group: 'ntthang', size: awardsContent.length, updatedAt: 'May 04 10:00' },
              }
            },
            projects: {
              name: 'projects', type: 'dir', permissions: 'drwxr-xr-x', owner: 'ntthang', group: 'ntthang', size: 4096, updatedAt: 'May 04 10:00',
              children: projects.reduce((acc, p) => {
                const safeName = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const content = `# ${p.title}\nYear: ${p.year}\nCategory: ${p.category}\nTags: ${p.tags.join(', ')}\n\n${p.description}\n${p.url ? 'Link: ' + p.url : ''}`;
                acc[safeName] = {
                  name: safeName, type: 'dir', permissions: 'drwxr-xr-x', owner: 'ntthang', group: 'ntthang', size: 4096, updatedAt: 'May 04 10:00',
                  children: {
                    'README.md': { name: 'README.md', type: 'file', content, permissions: '-rw-r--r--', owner: 'ntthang', group: 'ntthang', size: content.length, updatedAt: 'May 04 10:00' }
                  }
                };
                return acc;
              }, {} as Record<string, VFSNode>)
            },
            'start_ui.sh': { name: 'start_ui.sh', type: 'exec', content: 'echo "Initializing GUI overlay..."\nopenWindow projects\nopenWindow contact', permissions: '-rwxr-xr-x', owner: 'ntthang', group: 'ntthang', size: 120, updatedAt: 'May 04 10:00' },
            'cv.pdf': { name: 'cv.pdf', type: 'file', content: 'BINARY_CONTENT', permissions: '-rwxr-xr-x', owner: 'ntthang', group: 'ntthang', size: 1548290, updatedAt: 'May 04 10:00' },
          }
        }
      }
    },
    etc: {
      name: 'etc', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', size: 4096, updatedAt: 'May 04 10:00',
      children: {
        'os-release': { name: 'os-release', type: 'file', content: 'NAME="SCADA-Ubuntu"\nVERSION="22.04 LTS (Jammy Power)"\nID=ubuntu\nPRETTY_NAME="SCADA-Ubuntu 22.04 LTS"', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 104, updatedAt: 'May 04 10:00' },
        'passwd': { name: 'passwd', type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nntthang:x:1000:1000:ntthang,,,:/home/ntthang:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 142, updatedAt: 'May 04 10:00' }
      }
    },
    var: {
      name: 'var', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', size: 4096, updatedAt: 'May 04 10:00',
      children: {
        log: {
          name: 'log', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', size: 4096, updatedAt: 'May 04 10:00',
          children: {
            'syslog': { name: 'syslog', type: 'file', content: '[OK] Kernel loaded.\n[OK] PMU sync complete.\n[OK] Auth service running.', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 75, updatedAt: 'May 04 10:00' }
          }
        }
      }
    }
  }
};

export function resolvePath(vfs: VFSNode, currentPath: string[], targetPath: string): { node: VFSNode | null, error?: string, newPathArray?: string[] } {
  if (!targetPath || targetPath === '.') return { node: getNodeByPathArray(vfs, currentPath), newPathArray: currentPath };
  
  let parts = targetPath.split('/').filter(Boolean);
  let resolvedParts = targetPath.startsWith('/') ? [] : [...currentPath];
  
  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (resolvedParts.length > 0) resolvedParts.pop();
    } else {
      resolvedParts.push(part);
    }
  }
  
  const node = getNodeByPathArray(vfs, resolvedParts);
  if (!node) return { node: null, error: `bash: cd: ${targetPath}: No such file or directory` };
  return { node, newPathArray: resolvedParts };
}

export function getNodeByPathArray(vfs: VFSNode, pathArray: string[]): VFSNode | null {
  let curr = vfs;
  for (const part of pathArray) {
    if (curr.type !== 'dir' || !curr.children || !curr.children[part]) return null;
    curr = curr.children[part];
  }
  return curr;
}

export function formatPath(pathArray: string[]): string {
  if (pathArray.length === 0) return '/';
  return '/' + pathArray.join('/');
}
