import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Button } from '../ui';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Blog', href: '#' },
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Contact Us', href: '#' },
            { name: 'FAQs', href: '#' },
            { name: 'Feedback', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'Accessibility', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: 'f', name: 'Facebook' },
        { icon: 't', name: 'Twitter' },
        { icon: 'i', name: 'Instagram' },
        { icon: 'l', name: 'LinkedIn' },
    ];

    return (
        <footer className="bg-gradient-luxury border-t border-luxury-gold border-opacity-15 text-luxury-cream pt-20 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <h3 className="text-h4 font-playfair text-luxury-gold mb-4 tracking-wider">RESTRO</h3>
                        <p className="text-sm text-luxury-text-muted italic mb-6">
                            Experience the finest culinary delights in an atmosphere of elegance and luxury.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={social.name}
                                    href="#"
                                    whileHover={{ scale: 1.1, translateY: -3 }}
                                    className="w-10 h-10 border-2 border-luxury-gold rounded-full flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
                                    title={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-h4 font-playfair text-luxury-gold mb-6 tracking-wider">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-luxury-text-muted hover:text-luxury-gold transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-h4 font-playfair text-luxury-gold mb-6 tracking-wider">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-luxury-text-muted hover:text-luxury-gold transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-h4 font-playfair text-luxury-gold mb-6 tracking-wider">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-luxury-text-muted hover:text-luxury-gold transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-h4 font-playfair text-luxury-gold mb-6 tracking-wider">Newsletter</h4>
                        <p className="text-sm text-luxury-text-muted italic mb-4">
                            Subscribe for exclusive offers and updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-luxury-darker border border-luxury-gold border-opacity-30 rounded text-luxury-cream text-sm focus:outline-none focus:border-luxury-gold transition-colors duration-300"
                                required
                            />
                            <Button variant="primary" size="sm" type="submit">
                                Subscribe
                            </Button>
                            {subscribed && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs text-luxury-gold font-semibold"
                                >
                                    ✓ Thank you for subscribing!
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-luxury-gold border-opacity-15 pt-8 text-center"
                >
                    <p className="text-sm text-luxury-text-muted mb-2">
                        © {currentYear} Restro. All rights reserved. Crafted with elegance and excellence.
                    </p>
                    <p className="text-xs text-luxury-text-muted italic">
                        Experience the pinnacle of culinary artistry
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
