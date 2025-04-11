import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import RootLayoutContent from "@/components/root-layout-content"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Auctus Apex | Premium Marketing & Web Design",
  description: "Elevate your brand with sophisticated marketing strategies and bespoke web design solutions.",
  generator: "v0.dev",
}

// Make sure the layout is properly set up to handle the loading state
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.voiceflow.com" />
        <link rel="preconnect" href="https://general-runtime.voiceflow.com" />
        <link rel="preconnect" href="https://runtime-api.voiceflow.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* Single script to load Voiceflow */}
        <Script
          id="voiceflow-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Only load if not already loaded
              if (!window.voiceflowLoaded) {
                window.voiceflowLoaded = true;
                
                // First, remove any existing Voiceflow elements
                function cleanupExistingVoiceflow() {
                  const buttons = document.querySelectorAll('.vfrc-button');
                  buttons.forEach(button => button.remove());
                  
                  const chats = document.querySelectorAll('.vfrc-chat');
                  chats.forEach(chat => chat.remove());
                  
                  // Also remove any scripts that might reload Voiceflow
                  const scripts = document.querySelectorAll('script[src*="voiceflow"]');
                  scripts.forEach(script => {
                    if (script.id !== 'voiceflow-widget') {
                      script.remove();
                    }
                  });
                }
                
                // Clean up first
                cleanupExistingVoiceflow();
                
                // Then load a single instance
                (function(d, t) {
                  var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                  v.onload = function() {
                    if (window.voiceflow && window.voiceflow.chat) {
                      window.voiceflowWidget = window.voiceflow.chat.load({
                        verify: { projectID: '67f6bd5f2cdeec21050d450c' },
                        url: 'https://general-runtime.voiceflow.com',
                        versionID: 'production',
                        voice: {
                          url: "https://runtime-api.voiceflow.com"
                        }
                      });
                      
                      // Create a simple function to restart the chat
                      window.startNewChat = function() {
                        try {
                          window.voiceflow.chat.close();
                          setTimeout(function() {
                            window.voiceflow.chat.open();
                          }, 300);
                        } catch (e) {
                          console.error('Error restarting chat:', e);
                        }
                      };
                      
                      // Periodically check for and remove duplicate chat elements
                      setInterval(function() {
                        const buttons = document.querySelectorAll('.vfrc-button');
                        if (buttons.length > 1) {
                          console.log('Found duplicate chat buttons, removing extras');
                          for (let i = 1; i < buttons.length; i++) {
                            buttons[i].remove();
                          }
                        }
                        
                        const chats = document.querySelectorAll('.vfrc-chat');
                        if (chats.length > 1) {
                          console.log('Found duplicate chat containers, removing extras');
                          for (let i = 1; i < chats.length; i++) {
                            chats[i].remove();
                          }
                        }
                      }, 1000);
                    }
                  };
                  v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
                  v.type = "text/javascript";
                  s.parentNode.insertBefore(v, s);
                })(document, 'script');
              }
            `,
          }}
        />

        <LanguageProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </LanguageProvider>

        {/* Remove the ChatButton component from the layout */}
      </body>
    </html>
  )
}


import './globals.css'