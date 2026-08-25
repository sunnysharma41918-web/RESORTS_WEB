import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { experienceService } from '../../../services/experienceService';
import { FormField, FormInput, FormTextarea, FormSelect, FormToggle } from '../../../components/admin/AdminFormField';
import Button from '../../../components/common/Button';
import { useToast } from '../../../components/admin/ToastNotification';

const CATEGORIES = [
  { label: 'Ocean & Water', value: 'Ocean & Water' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Spa & Wellness', value: 'Spa & Wellness' },
  { label: 'Culinary & Heritage', value: 'Culinary & Heritage' },
  { label: 'Fine Dining', value: 'Fine Dining' },
  { label: 'Nature', value: 'Nature' },
];

export default function AdminExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Ocean & Water',
    location: '',
    duration: 'Half Day',
    description: '',
    image: '',
    featured: false,
  });

  useEffect(() => {
    if (isEditing) {
      experienceService.getExperienceById(id).then((e) => {
        if (e) setFormData(e);
      });
    }
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await experienceService.updateExperience(id, formData);
      addToast(`Experience "${formData.title}" updated.`);
    } else {
      await experienceService.createExperience(formData);
      addToast(`Experience "${formData.title}" created.`);
    }

    navigate('/admin/experiences');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-luxury-border">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/experiences"
            className="p-2 border border-luxury-border text-luxury-muted hover:text-luxury-light"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-1">
              {isEditing ? 'Modify Journey' : 'New Journey'}
            </span>
            <h1 className="text-3xl font-serif text-luxury-light">
              {isEditing ? `Edit: ${formData.title}` : 'Add Experience'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button to="/admin/experiences" variant="outline" size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {isEditing ? 'Save Changes' : 'Create Experience'}
          </Button>
        </div>
      </div>

      <div className="bg-luxury-card border border-luxury-border p-6 md:p-8 space-y-6">
        <FormField label="Experience Title" required>
          <FormInput
            required
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Sunset Yacht Charter & Marine Safari"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FormField label="Category" required>
            <FormSelect
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              options={CATEGORIES}
            />
          </FormField>

          <FormField label="Location" required>
            <FormInput
              required
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Goa Coast"
            />
          </FormField>

          <FormField label="Duration">
            <FormInput
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g. Half Day / 3 Hours"
            />
          </FormField>
        </div>

        <FormField label="Image URL" required>
          <FormInput
            required
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
          />
        </FormField>

        <FormField label="Full Description" required>
          <FormTextarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Detailed overview of what guests will experience..."
          />
        </FormField>

        <FormToggle
          label="Featured Experience"
          checked={formData.featured}
          onChange={(v) => handleChange('featured', v)}
          description="Display on homepage and top highlights"
        />
      </div>
    </form>
  );
}
