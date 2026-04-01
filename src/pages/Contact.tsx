import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
}

export default function Contact() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('https://contactforms-henna.vercel.app/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          _subject: 'New Baseline Assessment Booking Request',
          _template: 'table'
        })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', city: '' });
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-[#0e0e14] text-[#f0ead8] min-h-screen">
      {/* Optional: Add Navbar if you want navigation on contact page */}
      {/* <Navbar /> */}
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 md:px-8 lg:px-16">
        {/* Background elements */}
        <div 
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" 
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} 
        />
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", 
            backgroundSize: "60px 60px" 
          }} 
        />

        <div className={`relative z-10 w-full max-w-2xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#f0ead8]/40 hover:text-[#c9a84c] transition-colors duration-300 mb-8 text-xs tracking-widest uppercase"
          >
            <span className="text-lg">←</span> Back to Home
          </button>

          {/* Form container */}
          <div className="bg-[#13131a]/90 border border-[#c9a84c]/20 backdrop-blur-sm rounded-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">Begin Your Journey</span>
            </div>

            <h1 
              className="text-[#f0ead8] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,4vw,3rem)" }}
            >
              Book Your <em className="text-[#e2c97e]">Baseline Assessment</em>
            </h1>

            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#c9a84c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-[#f0ead8] text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Thank You!
                </h2>
                <p className="text-[#f0ead8]/60 text-sm">
                  Your assessment request has been received. We'll contact you within 24 hours.
                </p>
                <p className="text-[#f0ead8]/40 text-xs mt-4">
                  Redirecting you back...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-[#f0ead8]/60 text-[10px] tracking-[0.15em] uppercase mb-2">
                    Full Name <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-[#0a0a0a]/50 border ${errors.name ? 'border-red-500/50' : 'border-[#c9a84c]/20'} rounded-lg px-4 py-3 text-[#f0ead8] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-300`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-[#f0ead8]/60 text-[10px] tracking-[0.15em] uppercase mb-2">
                    Email Address <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#0a0a0a]/50 border ${errors.email ? 'border-red-500/50' : 'border-[#c9a84c]/20'} rounded-lg px-4 py-3 text-[#f0ead8] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-300`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-[#f0ead8]/60 text-[10px] tracking-[0.15em] uppercase mb-2">
                    Phone Number <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-[#0a0a0a]/50 border ${errors.phone ? 'border-red-500/50' : 'border-[#c9a84c]/20'} rounded-lg px-4 py-3 text-[#f0ead8] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-300`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="text-red-400 text-[10px] mt-1">{errors.phone}</p>}
                </div>

                {/* City Field */}
                <div>
                  <label htmlFor="city" className="block text-[#f0ead8]/60 text-[10px] tracking-[0.15em] uppercase mb-2">
                    City <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-[#0a0a0a]/50 border ${errors.city ? 'border-red-500/50' : 'border-[#c9a84c]/20'} rounded-lg px-4 py-3 text-[#f0ead8] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-300`}
                    placeholder="New York"
                  />
                  {errors.city && <p className="text-red-400 text-[10px] mt-1">{errors.city}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c9a84c] text-[#0a0a0a] px-8 py-4 text-[10px] tracking-[0.22em] uppercase font-semibold hover:bg-[#e2c97e] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Assessment'}
                </button>

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-xs text-center mt-4">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                <p className="text-[#f0ead8]/20 text-[8px] text-center mt-4">
                  By submitting, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      <style>{`
        @keyframes floatPill {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}