'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  published: boolean;
}

interface BlogPostListProps {
  posts: BlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const router = useRouter();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeletingSlug(slug);

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete post');
    } finally {
      setDeletingSlug(null);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update post');
    }
  };

  if (posts.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(226,232,240,0.6)',
      }}>
        No blog posts found. Create your first post!
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(148,163,184,0.25)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'rgba(226,232,240,0.75)', fontSize: '0.85rem' }}>
            <th style={headerCell}>Title</th>
            <th style={headerCell}>Author</th>
            <th style={headerCell}>Date</th>
            <th style={headerCell}>Status</th>
            <th style={headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug}>
              <td style={bodyCell}>
                <div>
                  <strong style={{ color: '#f8fafc' }}>{post.title}</strong>
                  {post.tags && post.tags.length > 0 && (
                    <div style={{ marginTop: '0.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.125rem 0.375rem',
                            background: 'rgba(59, 130, 246, 0.2)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '4px',
                            color: '#93c5fd',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td style={bodyCell}>{post.author}</td>
              <td style={bodyCell}>
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td style={bodyCell}>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: post.published
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(148, 163, 184, 0.2)',
                    color: post.published ? '#86efac' : '#cbd5e1',
                  }}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td style={bodyCell}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => router.push(`/dashboard/blog/${post.slug}`)}
                    style={actionButtonStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleTogglePublish(post)}
                    style={actionButtonStyle}
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    disabled={deletingSlug === post.slug}
                    style={{ ...actionButtonStyle, ...deleteButtonStyle }}
                  >
                    {deletingSlug === post.slug ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerCell: React.CSSProperties = {
  padding: '0.9rem 0.75rem',
  borderBottom: '1px solid rgba(148,163,184,0.25)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const bodyCell: React.CSSProperties = {
  padding: '0.85rem 0.75rem',
  borderBottom: '1px solid rgba(148,163,184,0.18)',
  verticalAlign: 'top',
  fontSize: '0.95rem',
};

const actionButtonStyle: React.CSSProperties = {
  padding: '0.375rem 0.75rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  background: 'rgba(239, 68, 68, 0.2)',
  borderColor: 'rgba(239, 68, 68, 0.3)',
  color: '#fca5a5',
};

