import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            className="relative h-screen bg-gradient-overlay bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(26, 26, 26, 0.5) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-10 right-20 w-96 h-96 bg-luxury-gold rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-8 -left-20 w-96 h-96 bg-luxury-burgundy rounded-full mix-blend-multiply filter blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Overline */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="inline-block px-4 py-2 bg-luxury-gold bg-opacity-10 border border-luxury-gold border-opacity-30 rounded-full text-luxury-gold text-sm font-bold tracking-widest uppercase">
                            Welcome to Restro
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-playfair text-hero text-white mb-6 tracking-wider leading-tight font-bold drop-shadow-2xl"
                    >
                        Culinary Excellence Redefined
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-luxury-gold mb-8 italic drop-shadow-lg max-w-2xl mx-auto"
                    >
                        Experience the pinnacle of gastronomic artistry where tradition meets innovation
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Button variant="primary" size="lg">
                            Browse Menu
                        </Button>
                        <Button variant="secondary" size="lg">
                            Make a Reservation
                        </Button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="text-luxury-gold opacity-70">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
