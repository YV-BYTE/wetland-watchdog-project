
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const CommunityDriveForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a community drive");
      navigate("/auth");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('community_drives')
        .insert([
          {
            creator_id: user.id,
            title: formData.title,
            description: formData.description,
            date: formData.date,
            time: formData.time,
            location: formData.location
          }
        ]);

      if (error) throw error;
      
      toast.success("Community drive created successfully!", {
        description: "Your event is now visible to the community.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: ""
      });
      
      // Refresh the community drives list - switch to the drives tab
      document.querySelector('[value="drives"]')?.dispatchEvent(new Event('click'));
      
    } catch (error: any) {
      toast.error("Error creating community drive", {
        description: error.message || "Please try again later.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {!user && (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-yellow-800 mb-4">
          <p className="font-medium">You need to be logged in to create a community drive</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => navigate("/auth")}
          >
            Sign in / Create account
          </Button>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Give your event a clear, descriptive name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the purpose and activities of your community drive..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Full address or meeting point"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary"
        disabled={isSubmitting || !user}
      >
        {isSubmitting ? "Creating..." : "Create Community Drive"}
      </Button>
    </form>
  );
};

export default CommunityDriveForm;
