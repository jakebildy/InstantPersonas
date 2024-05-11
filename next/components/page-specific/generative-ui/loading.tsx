export function Loading(props: { loadingMessage: string }) {
  return (
    // align center
    <div className="items-center justify-center space-x-2">
      <div className="m-w-4 w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-3 bg-green-600 rounded-full dark:bg-green-500 loading-animation"
          style={{ width: "45%" }}
        ></div>
      </div>
      <br></br>
      {props.loadingMessage}
    </div>
  );
}
