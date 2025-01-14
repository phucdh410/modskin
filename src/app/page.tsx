"use client";

import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export default function Home() {
  //#region Data
  const [token1, setToken1] = useState("");
  const [token2, setToken2] = useState("");
  const [url, setUrl] = useState("");
  const [otp, setOtp] = useState("");
  //#endregion

  //#region Event
  const onSubmit = async () => {
    const domain = new URL(url).origin;
    const params1 = createQueryString({
      codexn: token1,
      url: domain,
      loai_traffic: "https://www.google.com/",
      clk: "null",
    });
    await axios.post(`https://traffic-user.net/GET_MA.php?${params1}`);

    const params2 = createQueryString({
      codexn: token2,
      url: url,
      loai_traffic: domain,
      clk: "1734188725",
    });
    const res = await axios.post(
      `https://traffic-user.net/GET_MA.php?${params2}`
    );

    const parser = new DOMParser();
    const doc = parser.parseFromString(res.data, "text/html");
    const spanElement = doc.querySelector("#layma_me_vuatraffic");

    if (spanElement) {
      const codeValue = spanElement.textContent!.trim();
      setOtp(codeValue);
    } else {
      console.error("Could not find the code element.");
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(otp);
  };
  //#endregion

  //#region Render
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Hehe
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="token-1"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Token 1
            </label>
            <div className="mt-2">
              <input
                type="token-1"
                name="token-1"
                id="token-1"
                autoComplete="off"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={token1}
                onChange={(event) => setToken1(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="token-2"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Token 2
            </label>
            <div className="mt-2">
              <input
                type="token-2"
                name="token-2"
                id="token-2"
                autoComplete="off"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={token2}
                onChange={(event) => setToken2(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="url"
              className="block text-sm/6 font-medium text-gray-900"
            >
              URL
            </label>
            <div className="mt-2">
              <input
                type="url"
                name="url"
                id="url"
                autoComplete="off"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </div>
          </div>

          {otp && (
            <div className="flex items-center gap-3">
              <span>Mã lấy key là:</span>
              <span className="font-bold text-indigo-500">{otp}</span>
              <span className="h-4 w-4 cursor-pointer" onClick={onCopy}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
                </svg>
              </span>
            </div>
          )}

          <div>
            <button
              onClick={onSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Lấy mã
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
}
