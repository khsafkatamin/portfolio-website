import { Mail, Github, Linkedin, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'safkat.amin@rwth-aachen.de',
      href: 'mailto:safkat.amin@rwth-aachen.de'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@khsafkatamin',
      href: 'https://github.com/khsafkatamin'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/khsafkatamin',
      href: 'https://linkedin.com/in/khsafkatamin'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: '@safkat.saki',
      href: 'https://facebook.com/safkat.saki'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Get In Touch
        </h2>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 text-lg">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                target={method.label !== 'Email' ? '_blank' : undefined}
                rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all hover:shadow-lg hover:shadow-blue-500/10 border border-gray-700 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{method.label}</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's work together
            </h3>
            <p className="text-gray-400 mb-6">
              Have a project in mind? I'd love to hear about it.
            </p>
            <a
              href="mailto:safkat.amin@rwth-aachen.de"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              Send Message
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
