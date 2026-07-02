import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link2, BarChart3, Zap, Shield, QrCode, Palette } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  
  // Redirect logged-in users to dashboard
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Shorten Links, <br />
                <span className="text-blue-600 dark:text-blue-400">Amplify Results</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Create short, memorable links in seconds. Track performance, customize URLs, 
                and take control of your digital presence with powerful analytics.
              </p>
            </div>

            {/* Quick Demo */}
            <div className="w-full max-w-2xl pt-8">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Paste your long URL here..."
                      className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                    <Button size="lg" disabled className="sm:w-auto w-full">
                      Shorten
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3 text-center">
                    Sign in to start shortening links
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Everything you need to manage and optimize your links
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-4">
                    <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Instant Link Shortening</CardTitle>
                  <CardDescription>
                    Transform long URLs into short, shareable links in seconds. Simple and fast.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 2 */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Real-Time Analytics</CardTitle>
                  <CardDescription>
                    Track clicks, monitor performance, and understand your audience with detailed insights.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 3 */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Custom Short Links</CardTitle>
                  <CardDescription>
                    Create branded, memorable URLs that reflect your identity and boost trust.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 4 */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Experience blazing-fast redirects with minimal latency for the best user experience.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 5 */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle>Secure & Reliable</CardTitle>
                  <CardDescription>
                    Your links are protected with enterprise-grade security and 99.9% uptime.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 6 */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center mb-4">
                    <QrCode className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <CardTitle>QR Code Generation</CardTitle>
                  <CardDescription>
                    Automatically generate QR codes for your short links for offline sharing.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <Card className="max-w-3xl mx-auto bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 border-0">
              <CardContent className="py-12 px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-blue-50 mb-8 max-w-xl mx-auto">
                  Join thousands of users who trust us with their links. Start shortening for free today.
                </p>
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="text-base px-8">
                    Create Your First Link
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>&copy; 2026 Link Shortener. Built with Next.js and powered by innovation.</p>
        </div>
      </footer>
    </div>
  );
}
