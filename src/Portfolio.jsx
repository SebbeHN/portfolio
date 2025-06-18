import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, Code, Database, Server } from "lucide-react";

const projects = [
  {
    name: "WTP",
    url: "https://github.com/Hultberg80/WTP",
    description: "Webbaserat projektverktyg byggt i .NET och C#, med stöd för uppgiftshantering och användarroller.",
    technologies: [".NET", "C#", "SQL"],
    category: "Backend"
  },
  {
    name: "WOW",
    url: "https://github.com/AdminoBratt/WOW",
    description: "Grupprojekt som simulerar World of Warcraft-element i ett webbgränssnitt. Fokus på frontend och integrationer.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "Frontend"
  },
  {
    name: "Python Kunskapskontroll",
    url: "https://github.com/SebbeHN/python_kunskapskontroll",
    description: "Python kunskapskontroll som är uppdelad i två delar. Där den första delen handlar om grunderna i Python och Del 2 handlar om att analysera och tvätta ett dataset, samt visualsiera dataseten med hjälp av Panda, Seaborn, mathplotlib, numpy och plotly. För att sedan deplya sidan med hjälp av Streamlit.",
    technologies: ["Python"],
    category: "Backend"
  },
  {
    name: "Testing",
    url: "https://github.com/SebbeHN/Testing",
    description: "Experimentmiljö för testning av Java och C#-funktioner, inklusive enheter med xUnit.",
    technologies: ["Java", "C#", "xUnit", "Postman", "Playwright", "Github Actions"],
    category: "Testing"
  },
  {
    name: "Holiday Maker",
    url: "https://github.com/y-prog/holiday_maker",
    description: "Consoleapplikation i C# för hantering av semesterbokningar med databasstöd i PostgreSQL.",
    technologies: ["C#", "PostgreSQL"],
    category: "Backend"
  }
];

const skillCategories = {
  "Backend": "C#, .NET, Java, Minimal API",
  "Databaser": "PostgreSQL, SQL",
  "Frontend": "React, JavaScript, HTML, CSS",
  "Verktyg & Test": "Postman, Playwright, xUnit, Github Actions",
  "Övrigt": "Python, Git"
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const categories = ["All", ...new Set(projects.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-700 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">SHN</div>

            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Hem" },
                { id: "about", label: "Om mig" },
                { id: "skills", label: "Kompetens" },
                { id: "projects", label: "Projekt" },
                { id: "contact", label: "Kontakt" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`hover:text-blue-400 transition-colors ${
                    activeSection === item.id ? "text-blue-400" : "text-neutral-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              {[
                { id: "home", label: "Hem" },
                { id: "about", label: "Om mig" },
                { id: "skills", label: "Kompetens" },
                { id: "projects", label: "Projekt" },
                { id: "contact", label: "Kontakt" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-4xl">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Sebastian Holmberg Nilsson
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400">
                Fullstackutvecklare med fokus på Backend
              </p>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                Passionerad om att skapa robusta och skalbara backend-lösningar med Java och C#
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <a href="https://github.com/SebbeHN" target="_blank" rel="noopener noreferrer"
                 className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 hover:scale-110 transition-all">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/sebastian-holmberg-nilsson-02a4161a1/" target="_blank" rel="noopener noreferrer"
                 className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 hover:scale-110 transition-all">
                <Linkedin size={28} />
              </a>
              <a href="mailto:Sebbe_97@outlook.com"
                 className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 hover:scale-110 transition-all">
                <Mail size={28} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/CV_Sebastian_Holmberg_Nilsson.pdf" download
                 className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
                Ladda ner CV
              </a>
              <button onClick={() => scrollToSection("contact")}
                      className="px-8 py-3 border border-neutral-600 hover:border-blue-400 rounded-full hover:bg-neutral-800 transition-all">
                Kontakta mig
              </button>
            </div>

            <div className="animate-bounce mt-12">
              <ChevronDown size={32} className="mx-auto text-neutral-500" />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Om mig</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Jag är en passionerad student inom systemutveckling med målet att bli en fullstackutvecklare. Jag har genom mina projekt, lyckats utveckla en bra grund inom både backend och frontend. 
                  Jag ser fram emot att fortsätta växa inom dessa områden och bidra till spännande projekt. 
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Min erfarenhet sträcker sig över hela utbildningsprocessen, från kravanalys och design till implementation och testning. Jag har arbetat med både Java och C# för backendutveckling, och jag är bekväm med att använda olika databaser som SQL och PostgreSQL.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-neutral-800 rounded-xl">
                  <Code size={40} className="mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <p className="text-sm text-neutral-400">Java & C#</p>
                </div>
                <div className="text-center p-6 bg-neutral-800 rounded-xl">
                  <Database size={40} className="mx-auto mb-4 text-green-400" />
                  <h3 className="font-semibold mb-2">Databaser</h3>
                  <p className="text-sm text-neutral-400">SQL & Postgres</p>
                </div>
                <div className="text-center p-6 bg-neutral-800 rounded-xl">
                  <Server size={40} className="mx-auto mb-4 text-purple-400" />
                  <h3 className="font-semibold mb-2">API</h3>
                  <p className="text-sm text-neutral-400">REST & .NET</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 px-6 bg-neutral-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">Teknisk kompetens</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <Card key={category} className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-all rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">{category}</h3>
                    <p className="text-neutral-300">
                      {skills}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Projekt</h2>
            
            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                >
                  {category === "All" ? "Alla" : category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <Card key={project.name} 
                      className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 hover:shadow-xl transition-all group"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <span className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <p className="text-blue-300 text-sm mb-4">
                      {project.technologies.join(" • ")}
                    </p>
                    
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                      <Github size={16} />
                      Visa på GitHub
                      <ExternalLink size={14} />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-neutral-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Kontakta mig</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Låt oss prata!</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Jag är alltid intresserad av nya möjligheter och utmaningar. 
                  Kontakta mig gärna om du vill diskutera projekt eller samarbeten!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-blue-400" size={20} />
                    <span>Sebbe_97@outlook.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Linkedin className="text-blue-400" size={20} />
                    <span>LinkedIn Profil</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Github className="text-blue-400" size={20} />
                    <span>GitHub Portfolio</span>
                  </div>
                </div>
              </div>

              <Card className="bg-neutral-800 border border-neutral-700">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ditt namn"
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Din e-postadress"
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <textarea
                      placeholder="Ditt meddelande"
                      rows="5"
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3"
                      onClick={() => window.location.href = 'mailto:Sebbe_97@outlook.com'}
                    >
                      Skicka meddelande
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-neutral-700">
          <div className="max-w-6xl mx-auto text-center text-neutral-500">
            <p>© {new Date().getFullYear()} Sebastian Holmberg Nilsson. Alla rättigheter förbehållna.</p>
            <p className="mt-2 text-sm">Byggd med React och Tailwind CSS</p>
          </div>
        </footer>
      </main>
    </div>
  );
}