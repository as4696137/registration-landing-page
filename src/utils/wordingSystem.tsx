/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, type ReactNode, useEffect, useState } from "react";
import axios from "axios";
import * as R from "ramda";

interface WordingObject {
  [key: string]: WordingValue;
}

type WordingValue = string | number | boolean | null | WordingObject | WordingValue[];
type WordingSource = string | WordingObject;
type WordingPath = string | number;

type WordingString = string & {
  currentValue?: string;
  nl2br?: () => ReactNode;
  nl2p?: () => ReactNode;
  nl2array?: () => string[];
  param?: (key: string, replacedValue: string) => string;
};

let _wording: WordingObject | null = null;

export const loadWordingJson = (source: WordingSource): Promise<void> => {
  if (typeof source === "string") {
    return axios(source)
      .then((response) => response.data)
      .then((data: WordingObject) => {
        _wording = data;
      });
  }

  _wording = source;
  return Promise.resolve();
};

export const useWordingLoader = (source: WordingSource) => {
  const isSourceObject = typeof source === "object";

  if (isSourceObject) {
    _wording = source;
  }

  const [wordingLoaded, setWordingLoaded] = useState(isSourceObject);

  useEffect(() => {
    if (typeof source === "string") {
      loadWordingJson(source).then(() => setWordingLoaded(true));
    }
  }, []);

  return wordingLoaded;
};

export const _w = (...path: WordingPath[]): WordingValue | undefined => {
  if (!_wording) return undefined;

  const resolvedPath =
    path.length === 1 && typeof path[0] === "string"
      ? path[0].split(".")
      : path;

  let value = (R.path(resolvedPath, _wording) || "") as WordingValue;

  if (typeof value === "string") {
    const decodedValue = decodeArrowValue(value);
    value =
      typeof decodedValue === "string"
        ? decorateWordingString(decodedValue)
        : decodedValue;
  }

  if (isWordingObject(value)) {
    value = decodeArrowValueFromObject(value);
  }

  return value;
};

const decorateWordingString = (value: string): WordingString => {
  const wordingValue = value as WordingString;

  wordingValue.currentValue = value;
  wordingValue.nl2br = () => nl2br(value);
  wordingValue.nl2p = () => nl2p(value);
  wordingValue.nl2array = () => nl2array(value);
  wordingValue.param = (key: string, replacedValue: string) =>
    param(value as WordingString, key, replacedValue);

  return wordingValue;
};

const decodeArrowValueFromObject = (obj: WordingObject): WordingObject => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    obj[key] = typeof value === "string" ? decodeArrowValue(value) : value;

    if (isWordingObject(obj[key])) {
      obj[key] = decodeArrowValueFromObject(obj[key]);
    }
  });
  return obj;
};

const decodeArrowValue = (value: string): WordingValue => {
  if (value.indexOf("=>") === 0) {
    return _w(...value.replace("=>", "").split(".")) || "";
  }
  return value;
};

export const param = (
  search: WordingString,
  key: string,
  value: string,
): string => {
  const replaceReg = new RegExp(`\\$\\{${key}\\}`, "g");
  const rtn = search.currentValue?.replace(replaceReg, value) || "";
  search.currentValue = rtn;
  return rtn;
};

export const nl2br = (str?: string | null): ReactNode => {
  if (str === null || str === undefined) return "";

  if (navigator.userAgent.match("MSIE") || navigator.userAgent.match(".NET")) {
    return str;
  }

  const normalized = str.replace?.(/\\n/g, "\n");
  return normalized?.split?.("\n").map((item, key) => {
    return (
      <Fragment key={`nl2br${key}`}>
        {item}
        <br />
      </Fragment>
    );
  });
};

export const nl2p = (str?: string | null): ReactNode => {
  if (str === null || str === undefined) return "";
  const normalized = str.replace?.(/\\n/g, "\n");

  return normalized?.split?.("\n").map((item, key) => {
    const content = item !== "" ? item : <br />;
    return <p key={`nl2p${key}`}>{content}</p>;
  });
};

export const nl2array = (str?: string | null): string[] => {
  if (str === null || str === undefined) return [];
  const normalized = str.replace?.(/\\n/g, "\n");

  return normalized?.split?.("\n") || [];
};

const isWordingObject = (value: WordingValue | undefined): value is WordingObject => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
