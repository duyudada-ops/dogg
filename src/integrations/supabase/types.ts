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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      conversation_members: {
        Row: {
          conversation_id: string
          joined_at: string
          profile_id: string
        }
        Insert: {
          conversation_id: string
          joined_at?: string
          profile_id: string
        }
        Update: {
          conversation_id?: string
          joined_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      dog_profiles: {
        Row: {
          age: number
          bio: string | null
          breed: string
          created_at: string
          gender: string
          id: string
          is_demo: boolean | null
          location: string | null
          name: string
          photo_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age: number
          bio?: string | null
          breed: string
          created_at?: string
          gender: string
          id?: string
          is_demo?: boolean | null
          location?: string | null
          name: string
          photo_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number
          bio?: string | null
          breed?: string
          created_at?: string
          gender?: string
          id?: string
          is_demo?: boolean | null
          location?: string | null
          name?: string
          photo_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dogs: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          owner_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          owner_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          owner_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          capacity: number | null
          category: string | null
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          end_time: string | null
          eventbrite_id: string | null
          id: string
          image_url: string | null
          is_free: boolean | null
          is_online: boolean | null
          latitude: number | null
          longitude: number | null
          organizer_description: string | null
          organizer_name: string | null
          source: string | null
          start_time: string
          subcategory: string | null
          ticket_url: string | null
          title: string
          updated_at: string
          venue_address: string | null
          venue_name: string | null
        }
        Insert: {
          capacity?: number | null
          category?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          eventbrite_id?: string | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          is_online?: boolean | null
          latitude?: number | null
          longitude?: number | null
          organizer_description?: string | null
          organizer_name?: string | null
          source?: string | null
          start_time: string
          subcategory?: string | null
          ticket_url?: string | null
          title: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Update: {
          capacity?: number | null
          category?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          eventbrite_id?: string | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          is_online?: boolean | null
          latitude?: number | null
          longitude?: number | null
          organizer_description?: string | null
          organizer_name?: string | null
          source?: string | null
          start_time?: string
          subcategory?: string | null
          ticket_url?: string | null
          title?: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          alt: string
          created_at: string
          credited_to: string | null
          height: number | null
          id: string
          is_public: boolean
          source: string
          source_id: string | null
          src: string
          vibe: string | null
          width: number | null
        }
        Insert: {
          alt: string
          created_at?: string
          credited_to?: string | null
          height?: number | null
          id?: string
          is_public?: boolean
          source: string
          source_id?: string | null
          src: string
          vibe?: string | null
          width?: number | null
        }
        Update: {
          alt?: string
          created_at?: string
          credited_to?: string | null
          height?: number | null
          id?: string
          is_public?: boolean
          source?: string
          source_id?: string | null
          src?: string
          vibe?: string | null
          width?: number | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string
          id: string
          liked_dog_id: string
          liked_user_id: string
          liker_dog_id: string
          liker_user_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          liked_dog_id: string
          liked_user_id: string
          liker_dog_id: string
          liker_user_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          liked_dog_id?: string
          liked_user_id?: string
          liker_dog_id?: string
          liker_user_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_liked_dog_id_fkey"
            columns: ["liked_dog_id"]
            isOneToOne: false
            referencedRelation: "dog_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_liker_dog_id_fkey"
            columns: ["liker_dog_id"]
            isOneToOne: false
            referencedRelation: "dog_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_attachments: {
        Row: {
          created_at: string
          id: string
          message_id: string
          mime_type: string
          object_bucket: string
          object_name: string
          size_bytes: number
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          mime_type: string
          object_bucket: string
          object_name: string
          size_bytes: number
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          mime_type?: string
          object_bucket?: string
          object_name?: string
          size_bytes?: number
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          profile_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_fk"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_ends_at: string | null
          subscription_tier: string | null
          tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_ends_at?: string | null
          subscription_tier?: string | null
          tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_ends_at?: string | null
          subscription_tier?: string | null
          tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_events: {
        Row: {
          created_at: string
          event_id: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_swipes: {
        Row: {
          created_at: string
          id: string
          swipe_count: number | null
          swipe_date: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          swipe_count?: number | null
          swipe_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          swipe_count?: number | null
          swipe_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_mutual_match: {
        Args: {
          liked_dog_uuid: string
          liked_user_id: string
          liker_dog_uuid: string
          liker_user_id: string
        }
        Returns: string
      }
      find_or_create_two_member_conversation: {
        Args: { a_id: string; b_id: string; create_if_not_exists?: boolean }
        Returns: string
      }
      get_daily_swipe_count: {
        Args: { user_uuid: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_daily_swipes: {
        Args: { user_uuid: string }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
