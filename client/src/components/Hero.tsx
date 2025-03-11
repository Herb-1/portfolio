import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { personalInfo } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="section min-h-screen flex items-center pt-16 hero-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 hero-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hi, I'm <span className="text-primary">{personalInfo.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              {personalInfo.headline}
            </p>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              {personalInfo.shortBio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-blue-600 text-white font-medium">
                <a href="#about">About Me</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent hover:bg-gray-800 text-white font-medium border-white hover:border-gray-300">
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 shadow-xl border-4 border-white">
              <Avatar className="w-full h-full">
                <AvatarImage src={personalInfo.profileImageUrl} alt={`${personalInfo.name} profile`} className="w-full h-full object-cover" />
                <AvatarFallback className="w-full h-full text-4xl bg-primary/10">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
