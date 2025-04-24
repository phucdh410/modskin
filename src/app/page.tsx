/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState } from "react";

const createQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export default function Home() {
  //#region Data
  const [step, setStep] = useState(1);

  const [token1, setToken1] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  const [token2, setToken2] = useState("");
  const [url, setUrl] = useState("");
  const [clk, setClk] = useState("");

  const [otp, setOtp] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  //#endregion

  //#region Event
  const getLink = async () => {
    try {
      const res = await axios.post(
        "https://toolgamepc.com/wp-json/myplugin/v1/get_shortened_url"
      );
      const url = res.data?.url;

      const el = document.getElementById("link-get-code");
      if (el) {
        el.innerText = url;
      }
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const handleSubmit1 = async () => {
    const params1 = createQueryString({
      codexn: token1,
      url: baseUrl,
      loai_traffic: "https://www.google.com/",
      clk: "null",
    });
    const res = await axios.post(
      `https://traffic-user.net/GET_MA.php?${params1}`
    );

    const data = res.data;

    const match = data.match(
      /sessionStorage\.setItem\(\s*["']ymnclk["']\s*,\s*(\d+)\s*\)/
    );

    if (match) {
      const ymnclkValue = match[1];
      setClk(ymnclkValue);
    }

    setStep(2);
    try {
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  const onSubmit = async () => {
    const params2 = createQueryString({
      codexn: token2,
      url: url,
      loai_traffic: baseUrl,
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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onCopy = () => {
    handleCopyToClipboard(otp);
    setIsCopied(true);
  };
  //#endregion

  //#region Render
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Get code
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex gap-10">
          <div className="flex flex-[0.55] flex-col gap-y-2">
            <button
              onClick={getLink}
              className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Link
            </button>

            <span id="link-get-code" className="mb-5">
              Bấm get link và mở nó trong tab ẩn danh
            </span>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">
                Command 1:&nbsp;
                <span className="text-blue-700">CLICK_VUATRAFFIC_COM()</span>
              </span>
              <span
                className="h-4 w-4 cursor-pointer"
                onClick={() => handleCopyToClipboard("CLICK_VUATRAFFIC_COM()")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="fill-blue-500"
                >
                  <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
                </svg>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">
                Command 2:&nbsp;
                <span className="text-blue-700">vuatraffic_hoanthanh()</span>
              </span>
              <span
                className="h-4 w-4 cursor-pointer"
                onClick={() => handleCopyToClipboard("vuatraffic_hoanthanh()")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="fill-blue-500"
                >
                  <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="border-r border-solid border-slate-200"></div>
          <div className="flex flex-[0.45] flex-col gap-y-2">
            <div>
              <label
                htmlFor="token-1"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Token 1
              </label>
              <div className="mt-1">
                <input
                  name="token-1"
                  id="token-1"
                  autoComplete="off"
                  required
                  disabled={step === 2}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:placeholder:text-gray-400"
                  value={token1}
                  onChange={(event) => setToken1(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="baseUrl"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Base URL
              </label>
              <div className="mt-1">
                <input
                  name="baseUrl"
                  id="baseUrl"
                  autoComplete="off"
                  required
                  disabled={step === 2}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:placeholder:text-gray-400"
                  value={baseUrl}
                  onChange={(event) => setBaseUrl(event.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit1}
              disabled={step === 2 || !token1 || !baseUrl}
              className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Bước 1
            </button>

            <div className="border-t border-dashed border-gray-300 w-full my-4"></div>

            <div>
              <label
                htmlFor="token-2"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Token 2
              </label>
              <div className="mt-1">
                <input
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
              <div className="mt-1">
                <input
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
            <div>
              <label
                htmlFor="clk"
                className="block text-sm/6 font-medium text-gray-900"
              >
                CLK
              </label>
              <div className="mt-1">
                <input
                  name="clk"
                  id="clk"
                  autoComplete="off"
                  required
                  disabled
                  value={clk}
                  // onChange={(event) => setClk(event.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:placeholder:text-gray-400"
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
                {isCopied && (
                  <span className="text-green-500">Đã sao chép</span>
                )}
              </div>
            )}

            <button
              onClick={onSubmit}
              disabled={step === 1 || !token2 || !url}
              className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
