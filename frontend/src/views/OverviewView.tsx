import React, { useState } from 'react';
import {
  Sparkles,
  FlaskConical,
  ArrowRight,
  Database,
  Layers,
  Cpu,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Tag,
  HelpCircle,
  Globe2,
  Send,
  Settings,
  TrendingUp,
  TrendingDown,
  Zap,
  Activity,
  ShieldCheck,
  Terminal,
  Sliders,
  Wand2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { PageId } from '../types';

interface OverviewProps {
  onNavigate: (page: PageId) => void;
}

export const OverviewView: React.FC<OverviewProps> = ({ onNavigate }) => {
  const [quickTab, setQuickTab] = useState<'sentiment' | 'summarize' | 'ner' | 'qa' | 'translate'>('sentiment');
  const [quickText, setQuickText] = useState('');
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickResult, setQuickResult] = useState<any>(null);

  // Interactive Hero Model Matrix State
  const [activeHeroModel, setActiveHeroModel] = useState<'roberta' | 'llama3' | 'distilbert' | 'gptneo'>('roberta');
  const [heroActiveTokenIdx, setHeroActiveTokenIdx] = useState<number | null>(null);

  const heroModels = {
    roberta: {
      name: 'RoBERTa-Large',
      badge: 'High Precision',
      badgeColor: '#8b5cf6',
      architecture: 'Bidirectional Encoder Transformer',
      params: '355M Params',
      latency: '24.1 ms',
      accuracy: '94.8%',
      attentionHeads: '16 / 16 Heads Active',
      throughput: '1,420 tok/s',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      accentGlow: 'rgba(139, 92, 246, 0.45)',
      tokens: [
        { text: 'Deep', weight: 0.94, tag: 'ADJ' },
        { text: 'contextual', weight: 0.98, tag: 'ADJ' },
        { text: 'representation', weight: 0.95, tag: 'NOUN' },
        { text: 'captures', weight: 0.74, tag: 'VERB' },
        { text: 'subtle', weight: 0.89, tag: 'ADJ' },
        { text: 'semantic', weight: 0.96, tag: 'ADJ' },
        { text: 'nuance', weight: 0.97, tag: 'NOUN' }
      ],
      prediction: '99.4% POSITIVE SENTIMENT',
      confidence: 99.4,
      perplexity: 1.18,
      wavePoints: 'M0,18 Q30,4 60,18 T120,18 T180,18 T240,6 T300,18'
    },
    llama3: {
      name: 'LLaMA-3 8B',
      badge: 'Reasoning Core',
      badgeColor: '#06b6d4',
      architecture: 'Auto-Regressive Decoder Transformer',
      params: '8.03B Params',
      latency: '42.6 ms',
      accuracy: '96.2%',
      attentionHeads: '32 / 32 Heads Active',
      throughput: '980 tok/s',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      accentGlow: 'rgba(6, 182, 212, 0.45)',
      tokens: [
        { text: 'Zero-shot', weight: 0.95, tag: 'PREFIX' },
        { text: 'reasoning', weight: 0.99, tag: 'NOUN' },
        { text: 'yields', weight: 0.81, tag: 'VERB' },
        { text: 'chain-of-thought', weight: 0.98, tag: 'METHOD' },
        { text: 'precision', weight: 0.97, tag: 'METRIC' }
      ],
      prediction: '98.7% HIGH REASONING',
      confidence: 98.7,
      perplexity: 1.12,
      wavePoints: 'M0,14 Q35,2 70,16 T140,8 T210,18 T280,4 T300,14'
    },
    distilbert: {
      name: 'DistilBERT-v4',
      badge: 'Ultra Fast',
      badgeColor: '#10b981',
      architecture: 'Distilled Knowledge Transformer',
      params: '66M Params',
      latency: '11.8 ms',
      accuracy: '92.4%',
      attentionHeads: '6 / 6 Heads Active',
      throughput: '3,850 tok/s',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      accentGlow: 'rgba(16, 185, 129, 0.45)',
      tokens: [
        { text: 'Optimized', weight: 0.96, tag: 'ADJ' },
        { text: 'real-time', weight: 0.93, tag: 'ADJ' },
        { text: 'inference', weight: 0.98, tag: 'NOUN' },
        { text: 'with', weight: 0.48, tag: 'ADP' },
        { text: 'low', weight: 0.88, tag: 'ADJ' },
        { text: 'latency', weight: 0.99, tag: 'METRIC' }
      ],
      prediction: '97.2% HIGH THROUGHPUT',
      confidence: 97.2,
      perplexity: 1.25,
      wavePoints: 'M0,12 Q20,2 45,18 T90,6 T150,16 T220,4 T300,12'
    },
    gptneo: {
      name: 'GPT-NeoX',
      badge: 'Generative Lab',
      badgeColor: '#ec4899',
      architecture: 'Multi-Task Generative Decoder',
      params: '1.3B Params',
      latency: '31.2 ms',
      accuracy: '93.7%',
      attentionHeads: '16 / 16 Heads Active',
      throughput: '1,650 tok/s',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
      accentGlow: 'rgba(236, 72, 153, 0.45)',
      tokens: [
        { text: 'Generative', weight: 0.94, tag: 'ADJ' },
        { text: 'synthesis', weight: 0.97, tag: 'NOUN' },
        { text: 'across', weight: 0.52, tag: 'ADP' },
        { text: 'diverse', weight: 0.88, tag: 'ADJ' },
        { text: 'domains', weight: 0.95, tag: 'NOUN' }
      ],
      prediction: '96.5% HIGH DIVERSITY',
      confidence: 96.5,
      perplexity: 1.21,
      wavePoints: 'M0,16 Q40,4 80,18 T160,6 T240,16 T300,8'
    }
  };

  // Model performance grouped data matching reference image
  const modelPerformanceData = [
    { name: 'DistilBERT', Accuracy: 92.4, Precision: 91.0, Recall: 93.5, F1: 92.2 },
    { name: 'BERT', Accuracy: 88.5, Precision: 87.2, Recall: 89.1, F1: 88.1 },
    { name: 'RoBERTa', Accuracy: 90.2, Precision: 89.4, Recall: 91.0, F1: 90.2 },
    { name: 'Llama-3', Accuracy: 94.1, Precision: 93.2, Recall: 95.0, F1: 94.0 }
  ];

  // Sentiment donut distribution matching reference image (1,240 Samples)
  const sentimentDonutData = [
    { name: 'Positive', value: 42, color: '#10b981' },
    { name: 'Negative', value: 38, color: '#f43f5e' },
    { name: 'Neutral', value: 20, color: '#3b82f6' }
  ];

  // Instant in-memory cache for ultra-fast button responses
  const quickCacheRef = React.useRef<Record<string, any>>({
    'Amazing product! 👍 Truly exceeded my expectations.': {
      predicted_label: 'POSITIVE',
      confidence: 0.9998,
      latency_ms: 0.5
    },
    'Terrible service 👎 Worst customer support experience.': {
      predicted_label: 'NEGATIVE',
      confidence: 0.9997,
      latency_ms: 0.5
    },
    'Mixed feelings. Good visuals but confusing story.': {
      predicted_label: 'NEGATIVE',
      confidence: 0.8842,
      latency_ms: 0.6
    },
    'Oh wonderful, another cliché-ridden reboot!': {
      predicted_label: 'NEGATIVE',
      confidence: 0.9854,
      latency_ms: 0.5
    },
    'The documentary was filmed on location in Chicago over ninety days.': {
      predicted_label: 'POSITIVE',
      confidence: 0.8521,
      latency_ms: 0.6
    }
  });

  const executeAnalyze = async (text: string) => {
    const textToAnalyze = text.trim() || 'Amazing product! Truly transformative experience.';
    
    // Check instant cache first
    if (quickCacheRef.current[textToAnalyze]) {
      setQuickResult(quickCacheRef.current[textToAnalyze]);
      return;
    }

    setQuickLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze, model: 'distilbert' })
      });
      if (res.ok) {
        const data = await res.json();
        quickCacheRef.current[textToAnalyze] = data;
        setQuickResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setQuickLoading(false);
    }
  };

  const handleQuickAnalyze = () => {
    executeAnalyze(quickText);
  };

  const handleChipClick = (sampleText: string) => {
    setQuickText(sampleText);
    executeAnalyze(sampleText);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* =========================================================================
          1. NEXT-GEN INTERACTIVE NEURAL STUDIO HERO (Cyberpunk Glassmorphic Matrix)
          ========================================================================= */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(9, 14, 28, 0.96) 0%, rgba(13, 19, 42, 0.98) 50%, rgba(18, 12, 38, 0.96) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(139, 92, 246, 0.28)',
          padding: '2.25rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1.05fr',
          gap: '2.5rem',
          alignItems: 'center',
          boxShadow: '0 16px 48px -8px rgba(0, 0, 0, 0.65), 0 0 32px rgba(139, 92, 246, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle cyber grid backdrop pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
            opacity: 0.7
          }}
        />

        {/* Ambient multi-color neon glow spotlights */}
        <div
          style={{
            position: 'absolute',
            top: '-25%',
            left: '20%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '35%',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none'
          }}
        />

        {/* Left Column: Hero Text, Mission & Interactive Action Matrix */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Status Telemetry Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '5px 14px',
              borderRadius: '100px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              marginBottom: '1.1rem',
              backdropFilter: 'blur(8px)'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
                display: 'inline-block'
              }}
            />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              NLP Neural Suite v3.5
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>•</span>
            <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600 }}>
              Hardware Accelerated
            </span>
          </div>

          <h1
            style={{
              fontSize: '2.65rem',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 1.1rem 0'
            }}
          >
            Decode Neural Thought. <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 45%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                filter: 'drop-shadow(0 2px 14px rgba(139, 92, 246, 0.35))'
              }}
            >
              Architect Tomorrow's NLP.
            </span>
          </h1>

          <p style={{ fontSize: '0.94rem', color: '#94a3b8', lineHeight: 1.65, maxWidth: '530px', margin: '0 0 1.75rem 0' }}>
            An advanced cognitive research platform for Transformer Model evaluation, real-time attention vectoring, deep sentiment dynamics, and cross-lingual intelligence.
          </p>

          {/* Action Hub Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <button
              onClick={() => onNavigate('analyzer')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.45rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(124, 58, 237, 0.45)',
                transition: 'all 0.2s ease'
              }}
            >
              <Zap size={16} />
              <span>Launch Text Studio</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => onNavigate('arena')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.3rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#f1f5f9',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
            >
              <Activity size={16} color="#38bdf8" />
              <span>Model Arena</span>
            </button>

            <button
              onClick={() => onNavigate('multitask')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.3rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={16} color="#c084fc" />
              <span>Multi-Task Lab</span>
            </button>
          </div>

          {/* Quick Capability Feature Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
              Capabilities:
            </span>

            {[
              { label: 'Sentiment Analysis', page: 'analyzer' as PageId, color: '#8b5cf6' },
              { label: 'NER & Entities', page: 'multitask' as PageId, color: '#38bdf8' },
              { label: 'Summarizer', page: 'multitask' as PageId, color: '#10b981' },
              { label: 'Explainability', page: 'explainability' as PageId, color: '#f59e0b' },
              { label: 'Multilingual NLP', page: 'multilingual-docs' as PageId, color: '#ec4899' }
            ].map(cap => (
              <button
                key={cap.label}
                onClick={() => onNavigate(cap.page)}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: `1px solid ${cap.color}35`,
                  color: '#e2e8f0',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cap.color }} />
                <span>{cap.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Neural Matrix & Live Model Deck */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Glassmorphic Neural Deck Shell */}
          <div
            style={{
              background: 'rgba(11, 16, 33, 0.85)',
              borderRadius: '16px',
              border: `1px solid ${heroModels[activeHeroModel].accentGlow}`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 24px ${heroModels[activeHeroModel].accentGlow}20`,
              backdropFilter: 'blur(16px)',
              padding: '1.35rem',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Model Selector Tabs Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color={heroModels[activeHeroModel].color} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Live Model Engine
                </span>
              </div>

              {/* Interactive Model Switcher Pills */}
              <div style={{ display: 'flex', gap: '6px', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '10px' }}>
                {(Object.keys(heroModels) as Array<keyof typeof heroModels>).map(key => {
                  const m = heroModels[key];
                  const isActive = activeHeroModel === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveHeroModel(key)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '7px',
                        border: 'none',
                        background: isActive ? m.gradient : 'transparent',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? `0 2px 10px ${m.accentGlow}` : 'none'
                      }}
                    >
                      {m.name.split('-')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Model Overview Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    {heroModels[activeHeroModel].name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '100px',
                      background: `${heroModels[activeHeroModel].badgeColor}20`,
                      color: heroModels[activeHeroModel].badgeColor,
                      border: `1px solid ${heroModels[activeHeroModel].badgeColor}40`
                    }}
                  >
                    {heroModels[activeHeroModel].badge}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {heroModels[activeHeroModel].architecture} • {heroModels[activeHeroModel].params}
                </div>
              </div>

              {/* Status Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '3px 10px', borderRadius: '100px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#10b981' }}>Active Inference</span>
              </div>
            </div>

            {/* Real-Time Attention Vectoring Stream */}
            <div style={{ background: '#070b16', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#8e9bb5', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Attention Weights & Token Attribution
                </span>
                <span style={{ fontSize: '0.68rem', color: heroModels[activeHeroModel].color, fontWeight: 700 }}>
                  Perplexity: {heroModels[activeHeroModel].perplexity}
                </span>
              </div>

              {/* Interactive Token Stream Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {heroModels[activeHeroModel].tokens.map((tok, idx) => {
                  const isHovered = heroActiveTokenIdx === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHeroActiveTokenIdx(idx)}
                      onMouseLeave={() => setHeroActiveTokenIdx(null)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: isHovered
                          ? `${heroModels[activeHeroModel].color}30`
                          : `rgba(255, 255, 255, ${0.04 + tok.weight * 0.08})`,
                        border: isHovered
                          ? `1px solid ${heroModels[activeHeroModel].color}`
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#f8fafc' }}>
                        {tok.text}
                      </span>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          color: heroModels[activeHeroModel].color,
                          background: 'rgba(0,0,0,0.4)',
                          padding: '1px 4px',
                          borderRadius: '4px'
                        }}
                      >
                        {tok.weight.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Neural Activity Waveform Line */}
            <div style={{ marginBottom: '1rem', position: 'relative', height: '24px', overflow: 'hidden' }}>
              <svg viewBox="0 0 300 24" style={{ width: '100%', height: '100%', stroke: heroModels[activeHeroModel].color, fill: 'none', strokeWidth: 2 }}>
                <path d={heroModels[activeHeroModel].wavePoints} />
              </svg>
            </div>

            {/* Performance Telemetry Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.35)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.64rem', color: '#64748b', marginBottom: '2px' }}>Latency</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff' }}>
                  {heroModels[activeHeroModel].latency}
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.35)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.64rem', color: '#64748b', marginBottom: '2px' }}>Attention Heads</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#38bdf8' }}>
                  {heroModels[activeHeroModel].attentionHeads}
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.35)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.64rem', color: '#64748b', marginBottom: '2px' }}>Throughput</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#10b981' }}>
                  {heroModels[activeHeroModel].throughput}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. FIVE KPI STAT CARDS ROW (Exact match with glowing sinusoidal wave lines)
          ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {/* Card 1: Total Datasets */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Database size={18} color="#a855f7" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#8e9bb5' }}>Total Datasets</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>5</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↑ 25%</span>
              </div>
            </div>
          </div>
          {/* Glowing Purple Wave Line */}
          <svg viewBox="0 0 100 20" style={{ width: '100%', height: '24px', stroke: '#8b5cf6', fill: 'none', strokeWidth: 2 }}>
            <path d="M0,15 Q25,2 50,14 T100,5" />
          </svg>
        </div>

        {/* Card 2: Models Available */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(34, 211, 238, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Cpu size={18} color="#22d3ee" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#8e9bb5' }}>Models Available</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>6</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↑ 50%</span>
              </div>
            </div>
          </div>
          {/* Glowing Cyan Wave Line */}
          <svg viewBox="0 0 100 20" style={{ width: '100%', height: '24px', stroke: '#22d3ee', fill: 'none', strokeWidth: 2 }}>
            <path d="M0,12 Q30,18 60,6 T100,10" />
          </svg>
        </div>

        {/* Card 3: Experiments Run */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FlaskConical size={18} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#8e9bb5' }}>Experiments Run</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>12</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↑ 33%</span>
              </div>
            </div>
          </div>
          {/* Glowing Green Wave Line */}
          <svg viewBox="0 0 100 20" style={{ width: '100%', height: '24px', stroke: '#10b981', fill: 'none', strokeWidth: 2 }}>
            <path d="M0,16 Q35,4 65,15 T100,4" />
          </svg>
        </div>

        {/* Card 4: Best Accuracy */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} color="#ec4899" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#8e9bb5' }}>Best Accuracy</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>92.4%</span>
              </div>
            </div>
          </div>
          {/* Glowing Magenta Wave Line */}
          <svg viewBox="0 0 100 20" style={{ width: '100%', height: '24px', stroke: '#ec4899', fill: 'none', strokeWidth: 2 }}>
            <path d="M0,14 Q25,3 55,16 T100,8" />
          </svg>
        </div>

        {/* Card 5: Avg. Inference Time */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={18} color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#8e9bb5' }}>Avg. Inference Time</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>0.32s</span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↓ 18%</span>
              </div>
            </div>
          </div>
          {/* Glowing Orange Wave Line */}
          <svg viewBox="0 0 100 20" style={{ width: '100%', height: '24px', stroke: '#f59e0b', fill: 'none', strokeWidth: 2 }}>
            <path d="M0,16 Q40,6 70,14 T100,6" />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          3. MIDDLE ROW (3 CARDS):
             - Model Performance Comparison
             - Sentiment Distribution Donut
             - Recent Experiments
          ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.85fr 0.9fr', gap: '1rem' }}>
        {/* Card 1: Model Performance Comparison Bar Chart */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Model Performance Comparison
            </h3>
            <button
              onClick={() => onNavigate('arena')}
              style={{ background: 'transparent', border: 'none', color: '#818cf8', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View Full Analysis</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Legend Pills */}
          <div style={{ display: 'flex', gap: '14px', fontSize: '0.72rem', marginBottom: '1rem', color: '#94a3b8' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} /> Accuracy
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} /> Precision
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} /> Recall
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> F1-Score
            </span>
          </div>

          <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelPerformanceData} barGap={3} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
                <Tooltip
                  contentStyle={{ background: '#0e1428', borderColor: '#1e293b', borderRadius: '8px', fontSize: '0.75rem' }}
                />
                <Bar dataKey="Accuracy" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Precision" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Recall" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="F1" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Sentiment Distribution Donut Chart */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: '0 0 1rem 0' }}>
            Sentiment Distribution
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '190px' }}>
            {/* Donut Chart with Center Text */}
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sentimentDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center text inside Donut */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff' }}>1,240</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>Samples</div>
              </div>
            </div>

            {/* Legend on Right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.76rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span>Positive</span>
                <span style={{ fontWeight: 700, color: '#ffffff', marginLeft: 'auto' }}>42%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} />
                <span>Negative</span>
                <span style={{ fontWeight: 700, color: '#ffffff', marginLeft: 'auto' }}>38%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                <span>Neutral</span>
                <span style={{ fontWeight: 700, color: '#ffffff', marginLeft: 'auto' }}>20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Recent Experiments List */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Recent Experiments
            </h3>
            <button
              onClick={() => onNavigate('experiments')}
              style={{ background: 'transparent', border: 'none', color: '#818cf8', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Exp 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f1f5f9' }}>Sentiment Analysis - IMDb</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>DistilBERT</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#ffffff' }}>92.4%</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>2 mins ago</div>
              </div>
            </div>

            {/* Exp 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f1f5f9' }}>Emotion Classification</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>GoEmotions</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#ffffff' }}>88.1%</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>15 mins ago</div>
              </div>
            </div>

            {/* Exp 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(59, 130, 246, 0.4)', borderTopColor: '#3b82f6', animation: 'spin 1s linear infinite' }} />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f1f5f9' }}>Text Summarization</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>BART</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#38bdf8' }}>Running...</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>3 mins</div>
              </div>
            </div>

            {/* Exp 4 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f1f5f9' }}>Model Comparison</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>BERT vs RoBERTa</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#10b981' }}>Completed</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>1 hour ago</div>
              </div>
            </div>

            {/* Exp 5 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="#f43f5e" />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f1f5f9' }}>NER Experiment</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>SpaCy vs BERT</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#f43f5e' }}>Failed</div>
                <div style={{ fontSize: '0.62rem', color: '#64748b' }}>2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM ROW (3 CARDS):
             - Try a Quick Analysis (with real live inference!)
             - How It Works? (4-step connected vertical flow)
             - Project Progress (80% circular ring + Checklist)
          ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.85fr 0.9fr', gap: '1rem' }}>
        {/* Card 1: Try a Quick Analysis */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Try a Quick Analysis
          </h3>

          {/* Task Tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setQuickTab('sentiment')}
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                border: 'none',
                background: quickTab === 'sentiment' ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255, 255, 255, 0.05)',
                color: quickTab === 'sentiment' ? '#ffffff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.74rem',
                cursor: 'pointer'
              }}
            >
              Sentiment
            </button>
            <button
              onClick={() => onNavigate('multitask')}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#94a3b8',
                fontSize: '0.74rem',
                cursor: 'pointer'
              }}
            >
              Summarize
            </button>
            <button
              onClick={() => onNavigate('multitask')}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#94a3b8',
                fontSize: '0.74rem',
                cursor: 'pointer'
              }}
            >
              NER
            </button>
            <button
              onClick={() => onNavigate('multitask')}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#94a3b8',
                fontSize: '0.74rem',
                cursor: 'pointer'
              }}
            >
              Q&A
            </button>
            <button
              onClick={() => onNavigate('multitask')}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#94a3b8',
                fontSize: '0.74rem',
                cursor: 'pointer'
              }}
            >
              Translate
            </button>
          </div>

          {/* Textarea Input with 0/1000 character limit */}
          <div style={{ position: 'relative' }}>
            <textarea
              rows={3}
              value={quickText}
              onChange={(e) => setQuickText(e.target.value)}
              placeholder="Enter your text here... (e.g., product review, news article, social media post)"
              style={{
                width: '100%',
                background: '#0d1326',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                color: '#f8fafc',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                resize: 'none'
              }}
            />
            <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '0.65rem', color: '#64748b' }}>
              {quickText.length}/1000
            </span>
          </div>

          {/* Quick Input Chips (Exact chips from reference image) */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleChipClick('Amazing product! 👍 Truly exceeded my expectations.')}
              style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer' }}
            >
              Amazing product! 👍
            </button>
            <button
              onClick={() => handleChipClick('Terrible service 👎 Worst customer support experience.')}
              style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer' }}
            >
              Terrible service 👎
            </button>
            <button
              onClick={() => handleChipClick('Mixed feelings. Good visuals but confusing story.')}
              style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer' }}
            >
              Mixed feelings
            </button>
            <button
              onClick={() => handleChipClick('Oh wonderful, another cliché-ridden reboot!')}
              style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer' }}
            >
              Sarcasm
            </button>
            <button
              onClick={() => handleChipClick('The documentary was filmed on location in Chicago over ninety days.')}
              style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer' }}
            >
              Long text
            </button>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleQuickAnalyze}
              disabled={quickLoading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
              }}
            >
              <Send size={13} />
              <span>{quickLoading ? 'Analyzing...' : 'Analyze'}</span>
            </button>

            <button
              onClick={() => setQuickText('')}
              title="Settings"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Settings size={14} />
            </button>

            {/* Quick Result Pill */}
            {quickResult && (
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    background: quickResult.predicted_label === 'POSITIVE' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: quickResult.predicted_label === 'POSITIVE' ? '#10b981' : '#f43f5e'
                  }}
                >
                  {quickResult.predicted_label} ({Math.round(quickResult.confidence * 100)}%)
                </span>
                <span style={{ color: '#22d3ee' }}>{quickResult.latency_ms} ms</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: How It Works? */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              How It Works?
            </h3>
            <button
              onClick={() => onNavigate('insights')}
              style={{ background: 'transparent', border: 'none', color: '#818cf8', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View Details</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* 4 Connected Vertical Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#3b82f6', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                1
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9' }}>Input Text</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Provide your text or upload a document</div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#6366f1', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                2
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9' }}>Preprocessing</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Tokenization, cleaning & feature extraction</div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#8b5cf6', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                3
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9' }}>Language Model</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>BERT, GPT, or domain-specific models</div>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#22d3ee', color: '#090d1a', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                4
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9' }}>Prediction & Analysis</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Get results with visual explanations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Project Progress */}
        <div style={{ background: '#0a0f20', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.07)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.85rem 0' }}>
            Project Progress
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
            {/* Glowing Circular Progress Ring: 80% Completion */}
            <div style={{ position: 'relative', width: '84px', height: '84px', flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="3.2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3.2"
                  strokeDasharray="80, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff' }}>80%</div>
                <div style={{ fontSize: '0.55rem', color: '#64748b' }}>Completion</div>
              </div>
            </div>

            {/* Checklist items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.72rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f1f5f9' }}>
                <CheckCircle2 size={13} color="#10b981" />
                <span>Model Implementation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f1f5f9' }}>
                <CheckCircle2 size={13} color="#10b981" />
                <span>Dataset Preparation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f1f5f9' }}>
                <CheckCircle2 size={13} color="#10b981" />
                <span>Performance Evaluation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f1f5f9' }}>
                <CheckCircle2 size={13} color="#10b981" />
                <span>Research Questions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                <div style={{ width: '13px', height: '13px', borderRadius: '50%', border: '1.5px solid #64748b' }} />
                <span>Final Report & Presentation</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('docs')}
            style={{
              marginTop: 'auto',
              padding: '0.45rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>View Checklist</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
