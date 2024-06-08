export function Loading(props: { loadingMessage: string }) {
  return (
    // align center
    <div className="items-center justify-center space-x-2">
      <div className="m-w-4 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="loading-animation h-3 rounded-full bg-green-600 dark:bg-green-500"
          style={{ width: "45%" }}
        ></div>
      </div>
      <br></br>
      {props.loadingMessage}
    </div>
  );
}
