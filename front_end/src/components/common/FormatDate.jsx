import React from "react";

const FormatDate = (dateString) => {
  if (!dateString) return "날짜 정보 없음";
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  return;
};

export default FormatDate;
