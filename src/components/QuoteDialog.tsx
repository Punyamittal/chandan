import React, { useState } from "react";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  company: z
    .string()
    .trim()
    .min(1, { message: "Company name is required" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .max(20, { message: "Phone number must be less than 20 characters" }),
  service: z
    .string()
    .trim()
    .min(1, { message: "Please select a service" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteDialogProps {
  children?: React.ReactNode;
  buttonText?: string;
  buttonVariant?: "default" | "secondary" | "outline" | "ghost";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

const QuoteDialog = ({ 
  children, 
  buttonText = "Get Quote",
  buttonVariant = "default",
  buttonSize = "default"
}: QuoteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = quoteSchema.parse(formData);

      // Initialize EmailJS (only needed once, but safe to call multiple times)
      emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key

      // Prepare email parameters
      const templateParams = {
        to_email: 'punya.m215@gmail.com',
        from_name: validatedData.name,
        from_email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
        reply_to: validatedData.email,
      };

      // Send email via EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
        templateParams
      );

      // Success
      toast({
        title: "✅ Quote Request Submitted",
        description: "Our team will respond within 24 hours. Check your email for confirmation.",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map validation errors to form fields
        const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form and correct any errors.",
          variant: "destructive",
        });
      } else {
        console.error('Email error:', error);
        toast({
          title: "Error",
          description: "Failed to send quote request. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          React.cloneElement(children as React.ReactElement, {
            onClick: (e: React.MouseEvent) => {
              console.log("Dialog trigger clicked");
              setOpen(true);
              // Call original onClick if it exists
              if ((children as React.ReactElement).props.onClick) {
                (children as React.ReactElement).props.onClick(e);
              }
            }
          })
        ) : (
          <Button variant={buttonVariant} size={buttonSize}>
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto relative z-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will respond within 24 hours with a custom quote.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className={errors.company ? "border-destructive" : ""}
              />
              {errors.company && (
                <p className="text-xs text-destructive">{errors.company}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91-XXXX-XXX-XXX"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service Required *</Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border bg-background relative z-[9999] ${
                errors.service ? "border-destructive" : "border-input"
              }`}
            >
              <option value="">Select a service</option>
              <option value="offset-digital">Offset & Digital Printing</option>
              <option value="labeling">Product Labeling</option>
              <option value="trading">Bulk Trading</option>
              <option value="packaging">Custom Packaging</option>
              <option value="supplies">Industrial Supplies</option>
              <option value="other">Other</option>
            </select>
            {errors.service && (
              <p className="text-xs text-destructive">{errors.service}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Project Details *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements, quantities, timeline, etc."
              rows={6}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Quote Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
