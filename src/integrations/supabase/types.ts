export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      action_plan_tasks: {
        Row: {
          assignee_user_id: string | null
          created_at: string
          done: boolean
          due_date: string | null
          id: string
          plan_id: string
          space_id: string
          title: string
        }
        Insert: {
          assignee_user_id?: string | null
          created_at?: string
          done?: boolean
          due_date?: string | null
          id?: string
          plan_id: string
          space_id: string
          title: string
        }
        Update: {
          assignee_user_id?: string | null
          created_at?: string
          done?: boolean
          due_date?: string | null
          id?: string
          plan_id?: string
          space_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plan_tasks_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "action_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_plan_tasks_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      action_plans: {
        Row: {
          created_at: string
          deadline: string | null
          department_id: string | null
          description: string | null
          id: string
          linked_alert_id: string | null
          owner_user_id: string | null
          priority: string
          progress: number
          space_id: string
          status: Database["public"]["Enums"]["action_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          department_id?: string | null
          description?: string | null
          id?: string
          linked_alert_id?: string | null
          owner_user_id?: string | null
          priority?: string
          progress?: number
          space_id: string
          status?: Database["public"]["Enums"]["action_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          department_id?: string | null
          description?: string | null
          id?: string
          linked_alert_id?: string | null
          owner_user_id?: string | null
          priority?: string
          progress?: number
          space_id?: string
          status?: Database["public"]["Enums"]["action_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plans_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_plans_linked_alert_id_fkey"
            columns: ["linked_alert_id"]
            isOneToOne: false
            referencedRelation: "alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_plans_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          created_at: string
          department_id: string | null
          description: string | null
          id: string
          metric: string | null
          observed: number | null
          severity: Database["public"]["Enums"]["alert_severity"]
          space_id: string
          status: Database["public"]["Enums"]["alert_status"]
          threshold: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          description?: string | null
          id?: string
          metric?: string | null
          observed?: number | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          space_id: string
          status?: Database["public"]["Enums"]["alert_status"]
          threshold?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          description?: string | null
          id?: string
          metric?: string | null
          observed?: number | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          space_id?: string
          status?: Database["public"]["Enums"]["alert_status"]
          threshold?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          headcount: number
          id: string
          manager_user_id: string | null
          name: string
          name_ar: string | null
          space_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          headcount?: number
          id?: string
          manager_user_id?: string | null
          name: string
          name_ar?: string | null
          space_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          headcount?: number
          id?: string
          manager_user_id?: string | null
          name?: string
          name_ar?: string | null
          space_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          department_id: string | null
          email: string
          full_name: string
          hire_date: string | null
          id: string
          position: string | null
          space_id: string
          status: Database["public"]["Enums"]["employee_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          email: string
          full_name: string
          hire_date?: string | null
          id?: string
          position?: string | null
          space_id: string
          status?: Database["public"]["Enums"]["employee_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department_id?: string | null
          email?: string
          full_name?: string
          hire_date?: string | null
          id?: string
          position?: string | null
          space_id?: string
          status?: Database["public"]["Enums"]["employee_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_metrics: {
        Row: {
          absenteeism_rate: number | null
          avg_tenure_months: number | null
          created_at: string
          department_id: string | null
          id: string
          month: string
          space_id: string
          turnover_rate: number | null
        }
        Insert: {
          absenteeism_rate?: number | null
          avg_tenure_months?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          month: string
          space_id: string
          turnover_rate?: number | null
        }
        Update: {
          absenteeism_rate?: number | null
          avg_tenure_months?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          month?: string
          space_id?: string
          turnover_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_metrics_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "erp_metrics_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          event_id: string
          registered_at: string
          space_id: string
          user_id: string
        }
        Insert: {
          event_id: string
          registered_at?: string
          space_id: string
          user_id: string
        }
        Update: {
          event_id?: string
          registered_at?: string
          space_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          location: string | null
          space_id: string
          starts_at: string
          title: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          location?: string | null
          space_id: string
          starts_at: string
          title: string
        }
        Update: {
          capacity?: number
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          location?: string | null
          space_id?: string
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_tickets: {
        Row: {
          category: Database["public"]["Enums"]["ticket_category"]
          created_at: string
          created_at_bucket: string
          department_hint: string | null
          encrypted_content: string
          encrypted_subject: string
          id: string
          space_id: string
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_key_hash: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_at_bucket?: string
          department_hint?: string | null
          encrypted_content: string
          encrypted_subject: string
          id?: string
          space_id: string
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_key_hash: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_at_bucket?: string
          department_hint?: string | null
          encrypted_content?: string
          encrypted_subject?: string
          id?: string
          space_id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_key_hash?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_tickets_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      library_items: {
        Row: {
          category: string | null
          content_md: string | null
          cover_url: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          space_id: string
          tags: string[]
          title: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          content_md?: string | null
          cover_url?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          space_id: string
          tags?: string[]
          title: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          content_md?: string | null
          cover_url?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          space_id?: string
          tags?: string[]
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "library_items_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_permissions: {
        Row: {
          created_at: string
          id: string
          module: string
          space_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          module: string
          space_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          module?: string
          space_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manager_permissions_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reads: {
        Row: {
          message_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          message_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          message_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reads_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          audience: string
          body: string
          created_at: string
          id: string
          sender_user_id: string | null
          space_id: string
          subject: string
        }
        Insert: {
          audience?: string
          body: string
          created_at?: string
          id?: string
          sender_user_id?: string | null
          space_id: string
          subject: string
        }
        Update: {
          audience?: string
          body?: string
          created_at?: string
          id?: string
          sender_user_id?: string | null
          space_id?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_space_id: string | null
          full_name: string | null
          id: string
          locale: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_space_id?: string | null
          full_name?: string | null
          id: string
          locale?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_space_id?: string | null
          full_name?: string | null
          id?: string
          locale?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_current_space_id_fkey"
            columns: ["current_space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_invites: {
        Row: {
          code: string
          created_at: string
          created_by: string
          department_id: string | null
          email: string | null
          expires_at: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          space_id: string
          updated_at: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by: string
          department_id?: string | null
          email?: string | null
          expires_at?: string | null
          full_name?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          space_id: string
          updated_at?: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string
          department_id?: string | null
          email?: string | null
          expires_at?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          space_id?: string
          updated_at?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "space_invites_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_invites_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_kpi_snapshots: {
        Row: {
          burnout_risk: number | null
          created_at: string
          department_id: string | null
          id: string
          month: string
          participation: number | null
          response_count: number
          satisfaction: number | null
          space_id: string
          stress: number | null
        }
        Insert: {
          burnout_risk?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          month: string
          participation?: number | null
          response_count?: number
          satisfaction?: number | null
          space_id: string
          stress?: number | null
        }
        Update: {
          burnout_risk?: number | null
          created_at?: string
          department_id?: string | null
          id?: string
          month?: string
          participation?: number | null
          response_count?: number
          satisfaction?: number | null
          space_id?: string
          stress?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "space_kpi_snapshots_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_kpi_snapshots_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_members: {
        Row: {
          joined_at: string
          space_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          space_id: string
          user_id: string
        }
        Update: {
          joined_at?: string
          space_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_members_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          created_at: string
          email_domain: string | null
          id: string
          name: string
          owner_id: string
          slug: string
          space_key: string
          subscription_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_domain?: string | null
          id?: string
          name: string
          owner_id: string
          slug: string
          space_key?: string
          subscription_status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_domain?: string | null
          id?: string
          name?: string
          owner_id?: string
          slug?: string
          space_key?: string
          subscription_status?: string
          updated_at?: string
        }
        Relationships: []
      }
      survey_participation: {
        Row: {
          id: string
          participated_at: string
          survey_id: string
          user_id: string
        }
        Insert: {
          id?: string
          participated_at?: string
          survey_id: string
          user_id: string
        }
        Update: {
          id?: string
          participated_at?: string
          survey_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_participation_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_questions: {
        Row: {
          created_at: string
          factor: string | null
          id: string
          options: Json | null
          ord: number
          prompt: string
          prompt_ar: string | null
          qtype: Database["public"]["Enums"]["question_type"]
          space_id: string
          survey_id: string
        }
        Insert: {
          created_at?: string
          factor?: string | null
          id?: string
          options?: Json | null
          ord?: number
          prompt: string
          prompt_ar?: string | null
          qtype?: Database["public"]["Enums"]["question_type"]
          space_id: string
          survey_id: string
        }
        Update: {
          created_at?: string
          factor?: string | null
          id?: string
          options?: Json | null
          ord?: number
          prompt?: string
          prompt_ar?: string | null
          qtype?: Database["public"]["Enums"]["question_type"]
          space_id?: string
          survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_questions_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_questions_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          department_id: string | null
          factor: string | null
          id: string
          question_id: string
          space_id: string
          submission_batch: string
          submitted_at_bucket: string
          survey_id: string
          value_num: number | null
          value_text: string | null
        }
        Insert: {
          department_id?: string | null
          factor?: string | null
          id?: string
          question_id: string
          space_id: string
          submission_batch: string
          submitted_at_bucket?: string
          survey_id: string
          value_num?: number | null
          value_text?: string | null
        }
        Update: {
          department_id?: string | null
          factor?: string | null
          id?: string
          question_id?: string
          space_id?: string
          submission_batch?: string
          submitted_at_bucket?: string
          survey_id?: string
          value_num?: number | null
          value_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "survey_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          closes_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          methodology: Database["public"]["Enums"]["survey_methodology"]
          opens_at: string | null
          space_id: string
          status: Database["public"]["Enums"]["survey_status"]
          title: string
          title_ar: string | null
          updated_at: string
        }
        Insert: {
          closes_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          methodology?: Database["public"]["Enums"]["survey_methodology"]
          opens_at?: string | null
          space_id: string
          status?: Database["public"]["Enums"]["survey_status"]
          title: string
          title_ar?: string | null
          updated_at?: string
        }
        Update: {
          closes_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          methodology?: Database["public"]["Enums"]["survey_methodology"]
          opens_at?: string | null
          space_id?: string
          status?: Database["public"]["Enums"]["survey_status"]
          title?: string
          title_ar?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveys_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          author_role: string
          created_at: string
          encrypted_content: string
          id: string
          space_id: string
          ticket_id: string
        }
        Insert: {
          author_role: string
          created_at?: string
          encrypted_content: string
          id?: string
          space_id: string
          ticket_id: string
        }
        Update: {
          author_role?: string
          created_at?: string
          encrypted_content?: string
          id?: string
          space_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "feedback_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          space_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          space_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          space_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_space_id: { Args: never; Returns: string }
      has_manager_permission: {
        Args: { _module: string; _space_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _space_id: string
          _user_id: string
        }
        Returns: boolean
      }
      is_space_member: {
        Args: { _space_id: string; _user_id: string }
        Returns: boolean
      }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
      redeem_space_invite: {
        Args: { _code: string }
        Returns: {
          role: Database["public"]["Enums"]["app_role"]
          space_id: string
        }[]
      }
    }
    Enums: {
      action_status: "todo" | "in_progress" | "done" | "blocked"
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_status: "open" | "acknowledged" | "resolved"
      app_role: "super_admin" | "hr_admin" | "manager" | "employee"
      employee_status: "active" | "on_leave" | "inactive"
      question_type: "likert5" | "mcq" | "text"
      survey_methodology: "karasek" | "copsoq" | "custom"
      survey_status: "draft" | "open" | "closed"
      ticket_category:
        | "harassment"
        | "workload"
        | "management"
        | "safety"
        | "suggestion"
        | "other"
      ticket_status: "open" | "under_review" | "resolved" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      action_status: ["todo", "in_progress", "done", "blocked"],
      alert_severity: ["low", "medium", "high", "critical"],
      alert_status: ["open", "acknowledged", "resolved"],
      app_role: ["super_admin", "hr_admin", "manager", "employee"],
      employee_status: ["active", "on_leave", "inactive"],
      question_type: ["likert5", "mcq", "text"],
      survey_methodology: ["karasek", "copsoq", "custom"],
      survey_status: ["draft", "open", "closed"],
      ticket_category: [
        "harassment",
        "workload",
        "management",
        "safety",
        "suggestion",
        "other",
      ],
      ticket_status: ["open", "under_review", "resolved", "closed"],
    },
  },
} as const
