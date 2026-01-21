import Link from 'next/link';
import { CheckCircle2, Inbox, Megaphone, Users, Lock, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">OpsNest</h1>
          <div className="flex gap-4">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Enterprise Operations
          <span className="block text-blue-600">Made Simple</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Streamline your team's workflow with unified task management, approval workflows, and internal communications. All in one place.
        </p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
        >
          Start Free →
        </Link>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={CheckCircle2}
            title="Task Management"
            description="Create, assign, and track tasks with priority levels and deadlines"
          />
          <FeatureCard
            icon={Inbox}
            title="Approval Workflows"
            description="Build multi-step approval chains with complete audit trails"
          />
          <FeatureCard
            icon={Megaphone}
            title="Announcements"
            description="Share company updates with role-based targeting"
          />
          <FeatureCard
            icon={Users}
            title="Team Management"
            description="Manage hierarchical org structure with role-based access"
          />
          <FeatureCard
            icon={Lock}
            title="Enterprise Security"
            description="Multi-tenant architecture with row-level data isolation"
          />
          <FeatureCard
            icon={Zap}
            title="Real-time Sync"
            description="Instant updates and notifications for all activities"
          />
          <FeatureCard
            icon={Globe}
            title="Cloud-Ready"
            description="Deploy anywhere - Vercel, AWS, or self-hosted"
          />
          <FeatureCard
            icon={CheckCircle2}
            title="Activity Logs"
            description="Complete audit trail for compliance and accountability"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Simple, Transparent Pricing
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            name="Starter"
            price="$0"
            period="Free forever"
            features={["Up to 3 team members", "Basic task management", "Limited approvals"]}
          />
          <PricingCard
            name="Professional"
            price="$29"
            period="Per month"
            features={["Up to 20 team members", "Advanced workflows", "Priority support", "Custom branding"]}
            highlighted
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            period="Get in touch"
            features={["Unlimited users", "SSO & SAML", "Dedicated support", "SLA guarantee"]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to streamline your operations?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of teams using OpsNest to manage their workflows efficiently.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-medium text-lg"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                <li><Link href="#" className="hover:text-white">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 OpsNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <Icon className="text-blue-600 mb-4" size={32} />
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-8 ${
        highlighted
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-white shadow border border-gray-200'
      }`}
    >
      <h4 className="text-2xl font-bold mb-2">{name}</h4>
      <div className="text-3xl font-bold mb-1">{price}</div>
      <p className={`mb-6 ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
        {period}
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckCircle2 size={20} />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/auth/signup"
        className={`block text-center py-3 rounded-lg font-medium transition ${
          highlighted
            ? 'bg-white text-blue-600 hover:bg-gray-100'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}
