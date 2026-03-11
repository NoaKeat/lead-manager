import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Save, X } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d+$/;

export default function LeadForm({ isOpen, onSave, onCancel, isSaving }) {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (form.phone && !phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must contain digits only";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    setForm({ full_name: "", email: "", phone: "" });
    setErrors({});
  };

  const handleCancel = () => {
    setForm({ full_name: "", email: "", phone: "" });
    setErrors({});
    onCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-6">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-5">
              New Lead
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="full_name" className="text-slate-600 text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    placeholder="John Doe"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className={errors.full_name ? "border-red-400 focus-visible:ring-red-300" : ""}
                  />
                  {errors.full_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-600 text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-slate-600 text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="5551234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-200">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Lead"}
                </Button>
                <Button type="button" variant="ghost" onClick={handleCancel} className="text-slate-500">
                  <X className="w-4 h-4 mr-2" />
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