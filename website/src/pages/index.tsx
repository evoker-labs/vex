import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>61%</span>
              <span className={styles.statLabel}>of consumers face unreliable services weekly</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>44%</span>
              <span className={styles.statLabel}>stopped buying due to lack of trust</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started →
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="pathname:///VEX-PITCH.pdf"
              target="_blank">
              View Pitch Deck 📊
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProblemSolution() {
  return (
    <section className={styles.problemSolution}>
      <div className="container">
        <div className={styles.sectionGrid}>
          <div className={styles.problemBox}>
            <h2>🚨 The Problem</h2>
            <p>
              Anyone can launch an online business with AI, but this means dealing with:
            </p>
            <ul>
              <li>Fragile code and technical issues</li>
              <li>Fraud risks and fake reviews</li>
              <li>Lack of accountability</li>
            </ul>
          </div>
          <div className={styles.solutionBox}>
            <h2>✨ Our Solution</h2>
            <p>
              Blockchain allows us to create a decentralized network that brings:
            </p>
            <ul>
              <li>Security through immutable data</li>
              <li>Trust via community validation</li>
              <li>Anti-fraud measures built-in</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyDifferentiators() {
  return (
    <section className={styles.differentiators}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          What Makes VEX Different
        </Heading>
        <div className={styles.diffGrid}>
          <div className={styles.diffCard}>
            <div className={styles.diffIcon}>💰</div>
            <h3>User Rewards</h3>
            <p>Users are rewarded for each customer feedback provided</p>
          </div>
          <div className={styles.diffCard}>
            <div className={styles.diffIcon}>🤝</div>
            <h3>Community Trust</h3>
            <p>Community itself validates and guarantees trust</p>
          </div>
          <div className={styles.diffCard}>
            <div className={styles.diffIcon}>⚡</div>
            <h3>Lower Costs</h3>
            <p>Simple, fast transactions at a lower cost than competitors</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <Heading as="h2" className={styles.ctaTitle}>
          Ready to Build Trust on the Blockchain?
        </Heading>
        <p className={styles.ctaSubtitle}>
          Join the revolution in decentralized business reputation
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/business/overview">
            For Businesses 🏢
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/users/getting-started">
            For Users 👥
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="VEX - Your Voice, Our Chain, Their Accountability. A decentralized platform for business trust and customer feedback on blockchain.">
      <HomepageHeader />
      <main>
        <ProblemSolution />
        <HomepageFeatures />
        <KeyDifferentiators />
        <CTASection />
      </main>
    </Layout>
  );
}