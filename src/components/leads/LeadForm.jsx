import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";

// מייל תקין בסיסי אך טוב
const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

export default function LeadForm({ isOpen, onSave, onCancel, isSaving }) {
    const initialForm = {
        full_name: "",
        email: "",
        phone: "",
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (field, value) => {
        const trimmedValue = value.trim();

        switch (field) {
            case "full_name":
                if (!trimmedValue) {
                    return "Full name is required";
                }
                if (trimmedValue.length < 2) {
                    return "Full name must contain at least 2 characters";
                }
                return "";

            case "email":
                if (!trimmedValue) {
                    return "Email is required";
                }
                if (!emailRegex.test(trimmedValue)) {
                    return "Enter a valid email address";
                }
                return "";

            case "phone":
                if (!trimmedValue) {
                    return "Phone is required";
                }
                if (!/^\d+$/.test(trimmedValue)) {
                    return "Phone must contain digits only";
                }
                return "";

            default:
                return "";
        }
    };

    const validateForm = () => {
        const newErrors = {
            full_name: validateField("full_name", form.full_name),
            email: validateField("email", form.email),
            phone: validateField("phone", form.phone),
        };

        const filteredErrors = Object.fromEntries(
            Object.entries(newErrors).filter(([, value]) => value)
        );

        setErrors(filteredErrors);

        return Object.keys(filteredErrors).length === 0;
    };

    const handleChange = (field, value) => {
        let nextValue = value;


        const handleChange = (field, value) => {
            const nextValue = value;

            setForm((prev) => ({
                ...prev,
                [field]: nextValue,
            }));

            if (touched[field] || errors[field]) {
                const fieldError = validateField(field, nextValue);

                setErrors((prev) => ({
                    ...prev,
                    [field]: fieldError,
                }));
            }
        };

        setForm((prev) => ({
            ...prev,
            [field]: nextValue,
        }));

        // אם כבר נגעו בשדה או שכבר הייתה שגיאה - נבדוק שוב בזמן הקלדה
        if (touched[field] || errors[field]) {
            const fieldError = validateField(field, nextValue);

            setErrors((prev) => ({
                ...prev,
                [field]: fieldError,
            }));
        }
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }));

        const fieldError = validateField(field, form[field]);

        setErrors((prev) => ({
            ...prev,
            [field]: fieldError,
        }));
    };

    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
        setTouched({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setTouched({
            full_name: true,
            email: true,
            phone: true,
        });

        if (!validateForm()) return;

        const payload = {
            full_name: form.full_name.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
        };

        onSave(payload);
        resetForm();
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                >
                    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-6">
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-700">
                            New Lead
                        </h3>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                {/* FULL NAME */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.full_name}
                                        onChange={(e) => handleChange("full_name", e.target.value)}
                                        onBlur={() => handleBlur("full_name")}
                                        aria-invalid={!!errors.full_name}
                                        className={
                                            errors.full_name
                                                ? "border-red-400 focus-visible:ring-red-400"
                                                : ""
                                        }
                                    />
                                    {errors.full_name && (
                                        <p className="text-xs text-red-500">{errors.full_name}</p>
                                    )}
                                </div>

                                {/* EMAIL */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        onBlur={() => handleBlur("email")}
                                        aria-invalid={!!errors.email}
                                        className={
                                            errors.email
                                                ? "border-red-400 focus-visible:ring-red-400"
                                                : ""
                                        }
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                {/* PHONE */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="0501234567"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        onBlur={() => handleBlur("phone")}
                                        aria-invalid={!!errors.phone}
                                        className={
                                            errors.phone
                                                ? "border-red-400 focus-visible:ring-red-400"
                                                : ""
                                        }
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-red-500">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSaving ? "Saving..." : "Save Lead"}
                                </Button>

                                <Button type="button" variant="ghost" onClick={handleCancel}>
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}