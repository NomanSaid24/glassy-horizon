import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const genres = [
  'Hip-Hop', 'R&B', 'Pop', 'Electronic', 'Rock', 'Indie',
  'Afrobeats', 'Latin', 'Country', 'Jazz', 'Classical', 'Other',
];

export default function SubmissionForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    artistName: '',
    trackLink: '',
    genre: '',
    instagram: '',
    spotify: '',
    soundcloud: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.form-reveal');
    if (els) {
      gsap.from(els, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 40, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      });
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.artistName.trim() || form.artistName.trim().length > 100)
      errs.artistName = 'Artist name is required (max 100 chars)';
    if (!form.trackLink.trim())
      errs.trackLink = 'Track link is required';
    else {
      try {
        new URL(form.trackLink.trim());
      } catch {
        errs.trackLink = 'Please enter a valid URL';
      }
    }
    if (!form.genre) errs.genre = 'Please select a genre';
    // Optional social links validation
    const urlFields = ['instagram', 'spotify', 'soundcloud'] as const;
    urlFields.forEach((f) => {
      const val = form[f].trim();
      if (val) {
        try { new URL(val); } catch { errs[f] = 'Please enter a valid URL'; }
      }
    });
    if (form.message.length > 500) errs.message = 'Message must be under 500 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Track submitted successfully! We\'ll review it within 48-72 hours.');
      setForm({ artistName: '', trackLink: '', genre: '', instagram: '', spotify: '', soundcloud: '', message: '' });
    }, 1500);
  };

  const inputClass = (field: string) =>
    `w-full bg-secondary/30 border ${errors[field] ? 'border-destructive' : 'border-border/50'} rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-body text-sm`;

  return (
    <section id="submit" ref={sectionRef} className="section-padding relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="form-reveal text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Get Started
          </span>
          <h2 className="form-reveal font-display font-bold text-4xl md:text-5xl mb-4">
            Submit Your <span className="text-gradient-purple">Music</span>
          </h2>
          <p className="form-reveal text-muted-foreground text-lg max-w-xl mx-auto">
            Fill out the form below and our A&R team will review your submission within 48–72 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 md:p-10 glow-border space-y-6">
          {/* Artist Name */}
          <div className="form-reveal">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Artist Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="Your artist / stage name"
              maxLength={100}
              value={form.artistName}
              onChange={(e) => setForm({ ...form, artistName: e.target.value })}
              className={inputClass('artistName')}
            />
            {errors.artistName && <p className="text-destructive text-xs mt-1">{errors.artistName}</p>}
          </div>

          {/* Track Link */}
          <div className="form-reveal">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Track Link <span className="text-primary">*</span>
            </label>
            <input
              type="url"
              placeholder="https://soundcloud.com/your-track or Spotify, YouTube, etc."
              maxLength={500}
              value={form.trackLink}
              onChange={(e) => setForm({ ...form, trackLink: e.target.value })}
              className={inputClass('trackLink')}
            />
            {errors.trackLink && <p className="text-destructive text-xs mt-1">{errors.trackLink}</p>}
          </div>

          {/* Genre */}
          <div className="form-reveal">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Genre <span className="text-primary">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm({ ...form, genre: g })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    form.genre === g
                      ? 'btn-glow text-primary-foreground'
                      : 'glass text-muted-foreground hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            {errors.genre && <p className="text-destructive text-xs mt-1">{errors.genre}</p>}
          </div>

          {/* Social Links */}
          <div className="form-reveal">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Social Links <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground">Instagram</span>
                </div>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  maxLength={300}
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className={inputClass('instagram')}
                />
                {errors.instagram && <p className="text-destructive text-xs mt-1">{errors.instagram}</p>}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground">Spotify</span>
                </div>
                <input
                  type="url"
                  placeholder="https://open.spotify.com/..."
                  maxLength={300}
                  value={form.spotify}
                  onChange={(e) => setForm({ ...form, spotify: e.target.value })}
                  className={inputClass('spotify')}
                />
                {errors.spotify && <p className="text-destructive text-xs mt-1">{errors.spotify}</p>}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground">SoundCloud</span>
                </div>
                <input
                  type="url"
                  placeholder="https://soundcloud.com/..."
                  maxLength={300}
                  value={form.soundcloud}
                  onChange={(e) => setForm({ ...form, soundcloud: e.target.value })}
                  className={inputClass('soundcloud')}
                />
                {errors.soundcloud && <p className="text-destructive text-xs mt-1">{errors.soundcloud}</p>}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="form-reveal">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Additional Info <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your music, upcoming releases, or anything else..."
              maxLength={500}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass('message') + ' resize-none'}
            />
            <p className="text-muted-foreground/50 text-xs mt-1 text-right">{form.message.length}/500</p>
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>

          {/* Submit */}
          <div className="form-reveal pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-glow px-8 py-4 rounded-xl font-display font-bold text-lg text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Your Track
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
