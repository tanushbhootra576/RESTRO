import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';

const Testimonials = () => {
    const testimonials = [
        {
            author: 'Margaret Sullivan',
            role: 'Food Critic',
            content: 'An absolutely exquisite dining experience. Every dish was a masterpiece of flavor and presentation.',
            rating: 5,
        },
        {
            author: 'James Mitchell',
            role: 'Hospitality Magazine',
            content: 'The service was impeccable, the ambiance perfect, and the food utterly transcendent.',
            rating: 5,
        },
        {
            author: 'Elizabeth Chen',
            role: 'Culinary Expert',
            content: 'Restro sets a new standard for fine dining. Worth every penny and then some.',
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle subtitle="What our distinguished guests have to say">
                    Guest Testimonials
                </SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-luxury-cream rounded-lg p-8 border-l-4 border-luxury-gold hover:shadow-card-hover transition-all duration-300"
                        >
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <span key={i} className="text-luxury-gold text-xl">★</span>
                                ))}
                            </div>

                            <p className="text-body text-luxury-text-muted italic mb-6">
                                "{testimonial.content}"
                            </p>

                            <div>
                                <h4 className="font-playfair text-h4 text-luxury-text-dark font-semibold">
                                    {testimonial.author}
                                </h4>
                                <p className="text-sm font-bold text-luxury-gold tracking-widest uppercase">
                                    {testimonial.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
