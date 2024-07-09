import './App.css';
import './index.css';
import React, { useState } from 'react';

function App() {
  // State variables for weight, height (feet and inches), BMI, message, and dietary plan button visibility
  const [weight, setWeight] = useState(0);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [showDietaryPlanButton, setShowDietaryPlanButton] = useState(false);
  const [dietaryPlan, setDietaryPlan] = useState('');

  const calcBmi = (event) => {
    event.preventDefault(); // Prevent form submission

    // Validate weight and height inputs
    if (weight <= 0) {
      alert('Please enter a valid weight in kilograms.');
      return;
    }

    if (feet <= 0) {
      alert('Please enter a valid height in feet.');
      return;
    }

    if (inches < 0 || inches > 11) {
      alert('Please enter a valid height in inches (0-11).');
      return;
    }

    // Convert feet and inches to meters for BMI calculation
    const heightInMeters = (feet * 0.3048) + (inches * 0.0254);

    // Calculate BMI with proper precision control
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    // Update message and show dietary plan button based on BMI value
    if (bmiValue < 18.5) {
      setMessage('You are underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You are a healthy weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }

    setShowDietaryPlanButton(true);
    setDietaryPlan(''); // Reset dietary plan when BMI is recalculated
  };

  const resetForm = () => {
    setWeight(0);
    setFeet(0);
    setInches(0);
    setBmi('');
    setMessage('');
    setShowDietaryPlanButton(false);
    setDietaryPlan('');
  };

  const handleDietaryPlan = () => {
    let advice = '';

    if (bmi < 18.5) {
      advice = `
        <strong>Increase Caloric Intake:</strong> Incorporate more calorie-dense foods into your diet such as nuts, seeds, avocados, whole grains, and lean proteins. Ensure you are eating frequent meals and snacks throughout the day.<br/><br/>
        <strong>Strength Training:</strong> Engage in regular strength training exercises to build muscle mass. Activities such as weightlifting, bodyweight exercises, or resistance band workouts can help you gain healthy weight.<br/><br/>
        <strong>Balanced Nutrition:</strong> Focus on a balanced diet rich in nutrients. Include a variety of fruits, vegetables, whole grains, proteins, and healthy fats to ensure your body is getting all the essential vitamins and minerals.<br/><br/>
        <strong>Contact Nutritionist:</strong> 9999977777
      `;
    } else if (bmi >= 18.5 && bmi < 25) {
      advice = `
        <strong>Maintain a Balanced Diet:</strong> Continue consuming a balanced diet that includes a variety of nutrient-dense foods. Avoid excessive consumption of processed foods, sugary drinks, and high-fat foods.<br/><br/>
        <strong>Regular Exercise:</strong> Keep up with regular physical activity, aiming for at least 150 minutes of moderate-intensity or 75 minutes of high-intensity exercise per week. Include both cardio and strength training exercises in your routine.<br/><br/>
        <strong>Monitor Weight:</strong> Regularly check your weight and BMI to ensure you remain within the normal range. Adjust your diet and exercise routine as needed to maintain a healthy balance.<br/><br/>
        <strong>Contact Nutritionist:</strong> 9999977777
      `;
    } else if (bmi >= 25 && bmi < 30) {
      advice = `
        <strong>Caloric Deficit:</strong> Create a caloric deficit by consuming fewer calories than your body needs to maintain your current weight. Focus on eating smaller portions and choosing lower-calorie, nutrient-dense foods.<br/><br/>
        <strong>Increase Physical Activity:</strong> Incorporate more physical activity into your daily routine. Aim for at least 150 minutes of moderate-intensity exercise per week, such as brisk walking, cycling, or swimming.<br/><br/>
        <strong>Healthy Eating Habits:</strong> Avoid processed foods, sugary beverages, and high-fat foods. Opt for whole, unprocessed foods like fruits, vegetables, lean proteins, and whole grains. Practice mindful eating to avoid overeating.<br/><br/>
        <strong>Contact Nutritionist:</strong> 9999977777
      `;
    } else {
      advice = `
        <strong>Professional Guidance:</strong> Consider seeking guidance from a healthcare provider or a registered dietitian to create a personalized weight loss plan. They can provide you with tailored advice and support to achieve your goals safely.<br/><br/>
        <strong>Structured Exercise Plan:</strong> Develop a structured exercise plan that includes both cardiovascular and strength training exercises. Gradually increase the intensity and duration of your workouts as you build stamina and strength.<br/><br/>
        <strong>Behavioral Changes:</strong> Focus on making sustainable lifestyle changes rather than quick fixes. This includes adopting healthier eating habits, managing stress, getting adequate sleep, and staying consistent with your physical activity.<br/><br/>
        <strong>Contact Nutritionist:</strong> 9999977777
      `;
    }

    setDietaryPlan(advice);
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (kg)</label>
            <input
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              type="number" // Specify number input type for weight
              min="0" // Set minimum value for weight (non-negative)
              step="0.1" // Allow decimals for weight input
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
              <label>Height (ft):</label>
              <input
                value={feet}
                onChange={(e) => setFeet(parseInt(e.target.value))}
                type="number" // Specify number input type for feet
                min="0" // Set minimum value for feet (non-negative)
                step="1" // Ensure whole numbers for feet input
              />
            </div>
            <div style={{ width: '48%' }}>
              <label>Height (in):</label>
              <input
                value={inches}
                onChange={(e) => setInches(parseInt(e.target.value))}
                type="number" // Specify number input type for inches
                min="0" // Set minimum value for inches (non-negative)
                max="11" // Set maximum value for inches (0-11)
                step="1" // Ensure whole numbers for inches input
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" type="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
          {showDietaryPlanButton && (
            <button className="btn" onClick={handleDietaryPlan}>
              Advice
            </button>
          )}
        </div>

        {dietaryPlan && (
          <div className="center">
            <h3>Dietary Plan</h3>
            <p dangerouslySetInnerHTML={{ __html: dietaryPlan }}></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
