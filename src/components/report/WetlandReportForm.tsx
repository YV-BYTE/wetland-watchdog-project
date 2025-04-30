
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const WetlandReportForm = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    imageFile: null as File | null,
    imagePreview: "",
    severities: {
      pollution: false,
      invasiveSpecies: false,
      drainage: false,
      illegal: false,
      development: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof typeof formData.severities) => {
    setFormData((prev) => ({
      ...prev,
      severities: {
        ...prev.severities,
        [name]: !prev.severities[name]
      }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the selected image
    const imageUrl = URL.createObjectURL(file);
    
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to submit a report");
      navigate("/auth");
      return;
    }
    
    setIsSubmitting(true);

    // Verify at least one severity is checked
    const hasSeverity = Object.values(formData.severities).some(val => val);
    if (!hasSeverity) {
      toast.error("Please select at least one issue type");
      setIsSubmitting(false);
      return;
    }

    let imageUrl = null;
    
    try {
      // If there's an image file, upload it to storage
      if (formData.imageFile) {
        const fileExt = formData.imageFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(filePath, formData.imageFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('reports')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }
      
      // Save report data
      const { error } = await supabase
        .from('wetland_reports')
        .insert([
          {
            user_id: user.id,
            description: formData.description,
            location: formData.location,
            image_url: imageUrl,
            pollution: formData.severities.pollution,
            invasive_species: formData.severities.invasiveSpecies,
            drainage: formData.severities.drainage,
            illegal: formData.severities.illegal,
            development: formData.severities.development
          }
        ]);
        
      if (error) throw error;
      
      // Add points to user's profile
      await supabase
        .from('profiles')
        .update({ points: (profile?.points || 0) + 200 })
        .eq('id', user.id);
        
      // Refresh user profile to show updated points
      await refreshProfile();
      
      toast.success("Wetland report submitted successfully!", {
        description: "Thank you for helping us monitor wetland issues.",
      });

      // Reset form
      setFormData({
        description: "",
        location: "",
        imageFile: null,
        imagePreview: "",
        severities: {
          pollution: false,
          invasiveSpecies: false,
          drainage: false,
          illegal: false,
          development: false
        }
      });
    } catch (error: any) {
      toast.error("Error submitting report", {
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
          <p className="font-medium">You need to be logged in to submit a report</p>
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
        <Label htmlFor="image">Upload Image</Label>
        <div className="grid grid-cols-1 gap-4">
          {formData.imagePreview ? (
            <div className="relative">
              <img
                src={formData.imagePreview}
                alt="Selected wetland"
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setFormData(prev => ({ ...prev, imageFile: null, imagePreview: "" }))}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Label htmlFor="image" className="flex flex-col items-center cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <span className="text-muted-foreground">Click to upload image</span>
                <span className="text-xs text-muted-foreground/70 mt-1">
                  (JPG, PNG, WebP up to 5MB)
                </span>
              </Label>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description of Issue</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the wetland issue you've observed..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Address or coordinates of the wetland location"
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Issue Type (Select all that apply)</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pollution"
              checked={formData.severities.pollution}
              onCheckedChange={() => handleCheckboxChange('pollution')}
            />
            <Label htmlFor="pollution" className="text-sm font-normal cursor-pointer">
              Water Pollution
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="invasiveSpecies"
              checked={formData.severities.invasiveSpecies}
              onCheckedChange={() => handleCheckboxChange('invasiveSpecies')}
            />
            <Label htmlFor="invasiveSpecies" className="text-sm font-normal cursor-pointer">
              Invasive Species
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="drainage"
              checked={formData.severities.drainage}
              onCheckedChange={() => handleCheckboxChange('drainage')}
            />
            <Label htmlFor="drainage" className="text-sm font-normal cursor-pointer">
              Drainage/Drying
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="illegal"
              checked={formData.severities.illegal}
              onCheckedChange={() => handleCheckboxChange('illegal')}
            />
            <Label htmlFor="illegal" className="text-sm font-normal cursor-pointer">
              Illegal Activity
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="development"
              checked={formData.severities.development}
              onCheckedChange={() => handleCheckboxChange('development')}
            />
            <Label htmlFor="development" className="text-sm font-normal cursor-pointer">
              Development Threat
            </Label>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary"
        disabled={isSubmitting || !user}
      >
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </Button>
    </form>
  );
};

export default WetlandReportForm;
