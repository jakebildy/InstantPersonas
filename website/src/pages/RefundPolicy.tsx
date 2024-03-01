import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Refund Policy
        </h1>
        <div className="mt-8 text-lg text-gray-700 space-y-6">
          <p>
            At TeacherDashboard.ai, we strive to provide the best possible experience for our users. If you are not satisfied with your subscription, you can request a full refund within 30 days of the purchase date.
          </p>
          <p>
            To be eligible for a refund, you must have an active subscription to our service and have used it for less than 30 days. Refunds will be issued on a case-by-case basis, and we reserve the right to decline refund requests at our discretion.
          </p>
          <p>
            To request a refund, please contact our customer support team with your account details, including your email address and the reason for your refund request. We will review your request and respond to you as soon as possible.
          </p>
          <p>
            If your refund request is approved, we will process the refund, and a credit will automatically be applied to your credit card or original method of payment within a certain number of days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
