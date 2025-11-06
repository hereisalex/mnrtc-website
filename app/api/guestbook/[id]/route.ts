import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { userHasDashboardAccess } from '@/lib/auth';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !userHasDashboardAccess(session.user)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const params = await context.params;
    const entryId = params.id;

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS if needed
    const adminClient = getSupabaseAdminClient();
    const client = adminClient || supabase;

    const { error } = await client
      .from('guestbook_entries')
      .delete()
      .eq('id', entryId);

    if (error) {
      console.error('[API] Failed to delete guestbook entry', error);
      return NextResponse.json(
        { error: 'Failed to delete entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] Error deleting guestbook entry', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

