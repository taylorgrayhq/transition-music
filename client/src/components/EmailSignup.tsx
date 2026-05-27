import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Check, AlertCircle } from 'lucide-react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');

    try {
      // Mailchimp API endpoint for subscribing
      const response = await fetch('https://transitionmusic.us20.list-manage.com/subscribe/post-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          u: 'cf048a193514b1be72ab4bd70', // Account ID from your Mailchimp account
          id: '3482b66e08', // Audience ID
          EMAIL: email,
          b_cf048a193514b1be72ab4bd70_3482b66e08: '', // Bot field (leave empty)
        }).toString(),
        mode: 'no-cors', // Mailchimp requires CORS workaround
      });

      // With no-cors, we can't check the actual response, so we assume success
      setStatus('success');
      setMessage('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Mailchimp subscription error:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 pointer-events-none" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
            />
          </div>
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <Check className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-xs text-neutral-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
