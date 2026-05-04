export type FileType = 'dir' | 'file' | 'exec';

export interface VFSNode {
  name: string;
  type: FileType;
  content?: string; // For text files
  children?: Record<string, VFSNode>; // For directories
  permissions: string;
  owner: string;
  group: string;
  size: number;
  updatedAt: string;
}
