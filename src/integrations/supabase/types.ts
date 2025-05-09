export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community_drives: {
        Row: {
          created_at: string
          creator_id: string | null
          date: string
          description: string
          id: string
          location: string
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          date: string
          description: string
          id?: string
          location: string
          time: string
          title: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          date?: string
          description?: string
          id?: string
          location?: string
          time?: string
          title?: string
        }
        Relationships: []
      }
      drive_participants: {
        Row: {
          drive_id: string | null
          id: string
          joined_at: string
          user_id: string | null
        }
        Insert: {
          drive_id?: string | null
          id?: string
          joined_at?: string
          user_id?: string | null
        }
        Update: {
          drive_id?: string | null
          id?: string
          joined_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drive_participants_drive_id_fkey"
            columns: ["drive_id"]
            isOneToOne: false
            referencedRelation: "community_drives"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          publication_date: string
          source: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          publication_date?: string
          source?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          publication_date?: string
          source?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          level: number
          points: number
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          level?: number
          points?: number
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          level?: number
          points?: number
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          id: string
          options: Json
          quiz_id: string
          text: string
          updated_at: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          id?: string
          options: Json
          quiz_id: string
          text: string
          updated_at?: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          id?: string
          options?: Json
          quiz_id?: string
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_name: string
          id: string
          user_id: string | null
        }
        Insert: {
          awarded_at?: string
          badge_name: string
          id?: string
          user_id?: string | null
        }
        Update: {
          awarded_at?: string
          badge_name?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          availability: string
          bio: string | null
          created_at: string
          email: string
          expertise: string
          id: string
          location: string
          name: string
          user_id: string | null
        }
        Insert: {
          availability: string
          bio?: string | null
          created_at?: string
          email: string
          expertise: string
          id?: string
          location: string
          name: string
          user_id?: string | null
        }
        Update: {
          availability?: string
          bio?: string | null
          created_at?: string
          email?: string
          expertise?: string
          id?: string
          location?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wetland_reports: {
        Row: {
          created_at: string
          description: string
          development: boolean
          drainage: boolean
          id: string
          illegal: boolean
          image_url: string | null
          invasive_species: boolean
          location: string
          pollution: boolean
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          development?: boolean
          drainage?: boolean
          id?: string
          illegal?: boolean
          image_url?: string | null
          invasive_species?: boolean
          location: string
          pollution?: boolean
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          development?: boolean
          drainage?: boolean
          id?: string
          illegal?: boolean
          image_url?: string | null
          invasive_species?: boolean
          location?: string
          pollution?: boolean
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wetland_statistics: {
        Row: {
          id: string
          last_updated: string
          reports_submitted: number
          species_saved: number
          volunteers_engaged: number
          wetlands_protected: number
        }
        Insert: {
          id?: string
          last_updated?: string
          reports_submitted?: number
          species_saved?: number
          volunteers_engaged?: number
          wetlands_protected?: number
        }
        Update: {
          id?: string
          last_updated?: string
          reports_submitted?: number
          species_saved?: number
          volunteers_engaged?: number
          wetlands_protected?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
