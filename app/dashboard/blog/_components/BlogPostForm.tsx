'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  content_markdown: string;
  published: boolean;
}

interface BlogPostFormProps {
  post?: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

export function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState<BlogPost>({
    slug: post?.slug || '',
    title: post?.title || '',
    date: post?.date ? new Date(post.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    description: post?.description || '',
    author: post?.author || 'MNRTC',
    tags: post?.tags || [],
    content_markdown: post?.content_markdown || '',
    published: post?.published ?? true,
  });

  const [tagsInput, setTagsInput] = useState(post?.tags?.join(', ') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

    try {
      const url = post ? `/api/blog/${post.slug}` : '/api/blog';
      const method = post ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save post');
      }

      onSave();
      router.push('/dashboard/blog');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    router.push('/dashboard/blog');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{
          padding: '0.75rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#fca5a5',
        }}>
          {error}
        </div>
      )}

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Slug (URL-friendly identifier)
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
          disabled={!!post}
          style={inputStyle}
          placeholder="my-blog-post"
        />
        {post && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'rgba(226,232,240,0.6)' }}>Slug cannot be changed after creation</p>}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          style={inputStyle}
          placeholder="My Blog Post Title"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Author
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            style={inputStyle}
            placeholder="MNRTC"
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
          style={inputStyle}
          placeholder="A brief description of the post"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          style={inputStyle}
          placeholder="announcement, community, intro"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Content (Markdown)
        </label>
        <textarea
          value={formData.content_markdown}
          onChange={(e) => setFormData({ ...formData, content_markdown: e.target.value })}
          required
          rows={20}
          style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.875rem' }}
          placeholder="# My Blog Post&#10;&#10;Write your content here using Markdown..."
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          style={{ width: '1rem', height: '1rem' }}
        />
        <label htmlFor="published" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>
          Published (visible to public)
        </label>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleCancel}
          style={buttonStyle}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ ...buttonStyle, ...primaryButtonStyle }}
        >
          {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '0.95rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.625rem 1.25rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const primaryButtonStyle: React.CSSProperties = {
  background: '#1d4ed8',
  borderColor: '#3b82f6',
};

