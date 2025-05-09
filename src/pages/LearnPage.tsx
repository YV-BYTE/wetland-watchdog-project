
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const LearnPage = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };
  
  const wetlandImages = [
    {
      src: "https://www.clf.org/wp-content/uploads/2023/05/detail-wetlands-massachusetts-us-fish-and-wildlife.jpg",
      alt: "Massachusetts wetland ecosystem",
      caption: "Rich wetland ecosystem in Massachusetts"
    },
    {
      src: "https://site547756.mozfiles.com/files/547756/medium/Swamp_Wetland.jpg",
      alt: "Swamp wetland with cypress trees",
      caption: "Cypress swamp wetland"
    },
    {
      src: "https://i0.wp.com/californiawaterblog.com/wp-content/uploads/2023/09/CA-wet.jpg?resize=640%2C360&ssl=1",
      alt: "California wetland",
      caption: "California's critical wetland habitat"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DRGYIe9fdThlTH4SMcdwKpVlfBPfItkweA&s",
      alt: "Coastal wetland",
      caption: "Coastal wetland ecosystem"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfPIDO4mfetokS9sOUwZIdjsRPBIfZUYxy8Q&s",
      alt: "Freshwater marsh wetland",
      caption: "Freshwater marsh with diverse plant life"
    }
  ];

  return (
    <MainLayout>
      <section className="py-12 bg-wetland-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Learn About Wetlands</h1>
            <p className="text-muted-foreground text-lg">
              Discover the critical importance of wetland ecosystems, the threats they face, 
              and how we can all participate in their conservation.
            </p>
          </div>
          
          {/* Wetland Image Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8">Wetland Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wetlandImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="relative">
                    <AspectRatio ratio={16/9} className="bg-muted">
                      {!imagesLoaded[index] && <Skeleton className="absolute inset-0 z-10" />}
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="object-cover w-full h-full"
                        onLoad={() => handleImageLoad(index)}
                        style={{ opacity: imagesLoaded[index] ? 1 : 0 }}
                      />
                    </AspectRatio>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Section 1: Importance of Wetlands */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <Badge variant="secondary" className="mb-2">Ecosystem Services</Badge>
                <h2 className="text-3xl font-semibold">Importance of Wetlands</h2>
                <p className="text-muted-foreground">
                  Wetlands are among the most productive ecosystems in the world, comparable to 
                  rain forests and coral reefs. They serve as nature's kidneys, filtering pollutants 
                  from water and providing critical habitat for numerous species.
                </p>
                
                <div className="space-y-4 pt-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Biodiversity Hotspots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Though they cover only about 6% of Earth's surface, wetlands support over 40% of the world's species.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Natural Flood Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Wetlands act as natural sponges, absorbing and storing excess rainwater and reducing flood risks.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Carbon Sinks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Wetlands store carbon within their plant communities and soil, helping to mitigate climate change.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1439824938928-7a6ab478de86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Rich wetland ecosystem" 
                  className="rounded-lg shadow-lg object-cover w-full h-96"
                />
              </div>
            </div>
            
            {/* Section 2: Threats & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Threatened wetland" 
                  className="rounded-lg shadow-lg object-cover w-full h-96"
                />
              </div>
              
              <div className="space-y-4">
                <Badge variant="destructive" className="mb-2">Conservation Challenges</Badge>
                <h2 className="text-3xl font-semibold">Threats & Challenges</h2>
                <p className="text-muted-foreground">
                  Despite their ecological importance, wetlands are among the most threatened ecosystems. 
                  They continue to be degraded and lost due to drainage, pollution, invasive species, 
                  and climate change.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-destructive/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Development Pressure</h3>
                    <p className="text-sm text-muted-foreground">
                      Over 35% of wetlands have been lost since 1970 due to conversion for agriculture and development.
                    </p>
                  </div>
                  
                  <div className="bg-destructive/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Pollution</h3>
                    <p className="text-sm text-muted-foreground">
                      Agricultural runoff, industrial waste, and plastic pollution threaten wetland water quality.
                    </p>
                  </div>
                  
                  <div className="bg-destructive/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Invasive Species</h3>
                    <p className="text-sm text-muted-foreground">
                      Non-native plants and animals can outcompete native species and alter ecosystem functions.
                    </p>
                  </div>
                  
                  <div className="bg-destructive/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Climate Change</h3>
                    <p className="text-sm text-muted-foreground">
                      Rising temperatures and changing precipitation patterns alter wetland hydrology and species composition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section 3: Conservation Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <Badge variant="outline" className="bg-primary/5 mb-2">Take Action</Badge>
                <h2 className="text-3xl font-semibold">Conservation Methods</h2>
                <p className="text-muted-foreground">
                  Effective wetland conservation involves a combination of protection, restoration, 
                  community engagement, and policy implementation. Everyone can play a role in preserving 
                  these vital ecosystems.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-xl">What You Can Do</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Volunteer for local wetland cleanup and restoration projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Reduce water usage and avoid using harmful chemicals on your lawn or garden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Support wetland conservation organizations through donations or membership</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Advocate for strong wetland protection policies at local and national levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Educate others about the importance of wetlands and their conservation</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="mt-4" onClick={() => window.location.href = '/volunteer'}>
                  Join Our Conservation Efforts
                </Button>
              </div>
              
              <div className="order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Wetland conservation" 
                  className="rounded-lg shadow-lg object-cover w-full h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LearnPage;
