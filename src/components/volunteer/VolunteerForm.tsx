
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const expertiseOptions = [
  "Environmental Science",
  "Wildlife Conservation",
  "Education",
  "Data Management",
  "Community Outreach",
  "Photography",
  "Administrative Support",
  "Biology",
  "Hydrology",
  "Engineering",
  "Other"
];

const availabilityOptions = [
  "Weekends only",
  "Weekdays",
  "Evenings",
  "Flexible",
  "Seasonal",
  "Monthly",
  "Weekly"
];

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    availability: "",
    location: "",
    bio: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real app with Supabase, you would save to the database here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Thank you for registering as a volunteer!", {
        description: "We'll be in touch with opportunities soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        expertise: "",
        availability: "",
        location: "",
        bio: "",
      });
    } catch (error) {
      toast.error("There was a problem with your submission", {
        description: "Please try again later.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise">Area of Expertise</Label>
        <Select
          value={formData.expertise}
          onValueChange={(value) => handleSelectChange("expertise", value)}
          required
        >
          <SelectTrigger id="expertise">
            <SelectValue placeholder="Select your expertise" />
          </SelectTrigger>
          <SelectContent>
            {expertiseOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Select
          value={formData.availability}
          onValueChange={(value) => handleSelectChange("availability", value)}
          required
        >
          <SelectTrigger id="availability">
            <SelectValue placeholder="When are you available?" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, State/Province, Country"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Short Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us a little about yourself and why you're interested in wetland conservation..."
          rows={4}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Register as Volunteer"}
      </Button>
    </form>
  );
};

export default VolunteerForm;
