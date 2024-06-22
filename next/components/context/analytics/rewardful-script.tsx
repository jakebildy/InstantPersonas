"use client";

export function RewardfulScript() {
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
              (function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');
            `,
      }}
    />
  );
}
