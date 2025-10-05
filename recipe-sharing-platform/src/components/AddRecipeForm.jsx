import { useState } from 'react';

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle field blur (when user leaves a field)
  const handleBlur = (e) => {
    const name = e.target.name;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'title':
        if (!value.trim()) {
          error = 'Recipe title is required';
        } else if (value.trim().length < 3) {
          error = 'Title must be at least 3 characters long';
        }
        break;

      case 'ingredients':
        if (!value.trim()) {
          error = 'Ingredients are required';
        } else {
          // Check if there are at least 2 ingredients (separated by newlines or commas)
          const ingredientsList = value.split(/[\n,]/).filter(item => item.trim());
          if (ingredientsList.length < 2) {
            error = 'Please add at least 2 ingredients';
          }
        }
        break;

      case 'steps':
        if (!value.trim()) {
          error = 'Preparation steps are required';
        } else if (value.trim().length < 10) {
          error = 'Please provide more detailed preparation steps';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error === '';
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
      isValid = false;
    }

    // Validate ingredients
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
      isValid = false;
    } else {
      const ingredientsList = formData.ingredients.split(/[\n,]/).filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients';
        isValid = false;
      }
    }

    // Validate steps
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
      isValid = false;
    } else if (formData.steps.trim().length < 10) {
      newErrors.steps = 'Please provide more detailed preparation steps';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      title: true,
      ingredients: true,
      steps: true
    });

    // Validate form
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log('Recipe submitted:', formData);
        
        // Show success message
        setSubmitSuccess(true);
        setIsSubmitting(false);

        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            title: '',
            ingredients: '',
            steps: ''
          });
          setErrors({});
          setTouched({});
          setSubmitSuccess(false);
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your favorite recipe with the community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} noValidate>
            {/* Recipe Title */}
            <div className="mb-6">
              <label 
                htmlFor="title" 
                className="block text-gray-700 font-semibold mb-2"
              >
                Recipe Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.title && touched.title
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter recipe title (e.g., Chocolate Chip Cookies)"
              />
              {errors.title && touched.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <label 
                htmlFor="ingredients" 
                className="block text-gray-700 font-semibold mb-2"
              >
                Ingredients
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="6"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.ingredients && touched.ingredients
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter each ingredient on a new line:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;1 tsp vanilla extract"
              />
              <p className="mt-2 text-sm text-gray-500">
                Add each ingredient on a new line (minimum 2 ingredients)
              </p>
              {errors.ingredients && touched.ingredients && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.ingredients}
                </p>
              )}
            </div>

            {/* Preparation Steps */}
            <div className="mb-6">
              <label 
                htmlFor="steps" 
                className="block text-gray-700 font-semibold mb-2"
              >
                Preparation Steps
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="steps"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="8"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.steps && touched.steps
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Describe the preparation steps in detail:&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients in a bowl&#10;3. Add wet ingredients and stir until combined&#10;4. Pour into greased pan and bake for 25 minutes"
              />
              <p className="mt-2 text-sm text-gray-500">
                Provide detailed step-by-step instructions
              </p>
              {errors.steps && touched.steps && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.steps}
                </p>
              )}
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-green-800 font-semibold">Success!</p>
                  <p className="text-green-700 text-sm">Your recipe has been submitted successfully.</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Recipe
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ title: '', ingredients: '', steps: '' });
                  setErrors({});
                  setTouched({});
                }}
                className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Helper Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tips for a Great Recipe
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Use clear and descriptive titles
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              List ingredients with specific measurements
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Write detailed, easy-to-follow instructions
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Include cooking times and temperatures
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;