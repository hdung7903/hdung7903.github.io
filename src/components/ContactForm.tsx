'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  translations: {
    yourName: string;
    yourEmail: string;
    yourMessage: string;
    sendMessage: string;
    sending: string;
    success: string;
    error: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = translations.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = translations.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('sending');

    // Simulate API call - replace with actual endpoint
    try {
      // In a real app, you would send this to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // For now, we'll use mailto as fallback
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(formData.message);
      window.location.href = `mailto:work@hdung7903.me?subject=${subject}&body=${body}`;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={translations.yourName}
            className={`w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border ${
              errors.name ? 'border-red-500' : 'border-gray-300/50 dark:border-gray-600/50'
            } rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium`}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500 flex items-center gap-2"
            >
              <AlertCircle size={16} />
              {errors.name}
            </motion.p>
          )}
        </div>
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={translations.yourEmail}
            className={`w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border ${
              errors.email ? 'border-red-500' : 'border-gray-300/50 dark:border-gray-600/50'
            } rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500 flex items-center gap-2"
            >
              <AlertCircle size={16} />
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>
      <div>
        <textarea
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={translations.yourMessage}
          className={`w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 border ${
            errors.message ? 'border-red-500' : 'border-gray-300/50 dark:border-gray-600/50'
          } rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium resize-none`}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-500 flex items-center gap-2"
          >
            <AlertCircle size={16} />
            {errors.message}
          </motion.p>
        )}
      </div>
      
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
        >
          <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
          <span className="text-green-700 dark:text-green-300 font-medium">{translations.success}</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
        >
          <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
          <span className="text-red-700 dark:text-red-300 font-medium">{translations.error}</span>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: status !== 'sending' ? 1.02 : 1, y: status !== 'sending' ? -2 : 0 }}
        whileTap={{ scale: status !== 'sending' ? 0.98 : 1 }}
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <span className="relative z-10 flex items-center justify-center gap-3">
          {status === 'sending' ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              {translations.sending}
            </>
          ) : (
            <>
              <Send size={20} />
              {translations.sendMessage}
            </>
          )}
        </span>
      </motion.button>
    </form>
  );
}


