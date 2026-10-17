# ShipIt Academy

A step-by-step course and workspace platform that takes beginners from app idea to Google Play publication.

## Architecture & Tech Stack
- **Frontend**: Next.js App Router (TypeScript, Tailwind CSS)
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Triggers)

---

## Database Security

- **Row Level Security (RLS)** is enabled on all database tables (`profiles`, `courses`, `modules`, `lessons`, `lesson_progress`, `projects`, `project_features`, `project_screens`, `certificates`).
- **User Isolation**: Users can access and modify only their own private data (`profiles`, `lesson_progress`, `projects`, `project_features`, `project_screens`).
- **Course Content Access**: Published course content (`courses`, `modules`, `lessons`) is readable by all authenticated users, but normal users cannot modify or delete course content.
- **Certificate Protection**: Users cannot create or modify certificates directly; certificates are issued securely via backend logic.
- **Service Role Security**: The Supabase service role key must never be exposed to the browser and remains strictly server-side.
