import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({
    isOpen = false,
    onClose,
    title,
    children,
    size = 'md'
}) => {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`bg-white rounded-lg shadow-luxury-lg ${sizes[size]} w-full max-h-[90vh] overflow-y-auto`}
                        >
                            {title && (
                                <div className="border-b border-luxury-border p-6">
                                    <h2 className="text-h3 font-playfair text-luxury-text-dark">{title}</h2>
                                </div>
                            )}
                            <div className="p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
