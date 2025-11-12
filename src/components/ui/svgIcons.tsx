export const NoConnection = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M13 9.5L10 12.5"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13 12.5L10 9.5"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 4.5V7"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 2V7"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.5 7V12.5"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 9.5V12.5"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 12V12.5"
      stroke="#F87171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const StableConnection = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10 4.5V12.5"
      stroke="#4ADE80"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 2V12.5"
      stroke="#4ADE80"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.5 7V12.5"
      stroke="#4ADE80"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 9.5V12.5"
      stroke="#4ADE80"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 12V12.5"
      stroke="#4ADE80"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const PoorConnection = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.5 7V12.5"
      stroke="#F59E0B"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 9.5V12.5"
      stroke="#F59E0B"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 12V12.5"
      stroke="#F59E0B"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export const CornersOut = ({
  isConnected,
  className,
}: {
  isConnected: boolean
  className?: string
}) => {
  if (!isConnected) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M10.5 3H13V5.5"
          stroke="#A8A29E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 13H3V10.5"
          stroke="#A8A29E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 10.5V13H10.5"
          stroke="#A8A29E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 5.5V3H5.5"
          stroke="#A8A29E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <path
        d="M11 0.5V3C11.0001 3.09895 10.9708 3.19569 10.9159 3.27799C10.8609 3.36029 10.7828 3.42444 10.6914 3.46231C10.6 3.50019 10.4994 3.51009 10.4023 3.49076C10.3053 3.47144 10.2162 3.42376 10.1462 3.35375L7.64625 0.85375C7.57624 0.783822 7.52856 0.694696 7.50924 0.597654C7.48991 0.500611 7.49981 0.400017 7.53769 0.308605C7.57557 0.217194 7.63971 0.139075 7.72201 0.08414C7.80431 0.0292046 7.90105 -7.77138e-05 8 1.549e-07H10.5C10.6326 1.549e-07 10.7598 0.0526787 10.8536 0.146447C10.9473 0.240215 11 0.367392 11 0.5ZM0.85375 7.64625C0.783822 7.57624 0.694696 7.52856 0.597654 7.50924C0.500611 7.48991 0.400017 7.49981 0.308605 7.53769C0.217194 7.57557 0.139075 7.63971 0.08414 7.72201C0.0292046 7.80431 -7.77138e-05 7.90105 1.549e-07 8V10.5C1.549e-07 10.6326 0.0526787 10.7598 0.146447 10.8536C0.240215 10.9473 0.367392 11 0.5 11H3C3.09895 11.0001 3.19569 10.9708 3.27799 10.9159C3.36029 10.8609 3.42444 10.7828 3.46231 10.6914C3.50019 10.6 3.51009 10.4994 3.49076 10.4023C3.47144 10.3053 3.42376 10.2162 3.35375 10.1462L0.85375 7.64625ZM10.6912 7.53813C10.5999 7.50023 10.4994 7.49027 10.4023 7.50952C10.3053 7.52876 10.2162 7.57635 10.1462 7.64625L7.64625 10.1462C7.57624 10.2162 7.52856 10.3053 7.50924 10.4023C7.48991 10.4994 7.49981 10.6 7.53769 10.6914C7.57557 10.7828 7.63971 10.8609 7.72201 10.9159C7.80431 10.9708 7.90105 11.0001 8 11H10.5C10.6326 11 10.7598 10.9473 10.8536 10.8536C10.9473 10.7598 11 10.6326 11 10.5V8C11 7.90111 10.9706 7.80445 10.9157 7.72223C10.8607 7.64002 10.7826 7.57595 10.6912 7.53813ZM3 1.549e-07H0.5C0.367392 1.549e-07 0.240215 0.0526787 0.146447 0.146447C0.0526787 0.240215 1.549e-07 0.367392 1.549e-07 0.5V3C-7.77138e-05 3.09895 0.0292046 3.19569 0.08414 3.27799C0.139075 3.36029 0.217194 3.42444 0.308605 3.46231C0.400017 3.50019 0.500611 3.51009 0.597654 3.49076C0.694696 3.47144 0.783822 3.42376 0.85375 3.35375L3.35375 0.85375C3.42376 0.783822 3.47144 0.694696 3.49076 0.597654C3.51009 0.500611 3.50019 0.400017 3.46231 0.308605C3.42444 0.217194 3.36029 0.139075 3.27799 0.08414C3.19569 0.0292046 3.09895 -7.77138e-05 3 1.549e-07Z"
        fill="#A2DB5C"
      />
    </svg>
  )
}

export const SearchIcon = ({
  isConnected,
  className,
}: {
  isConnected: boolean
  className?: string
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
      stroke={isConnected ? '#A2DB5C' : '#FAFAF9'}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5356 10.5356L14 14"
      stroke={isConnected ? '#A2DB5C' : '#FAFAF9'}
      stroke-linecap="round"
      stroke-linejoin="round"
      // className={isConnected ? 'text-icon-active' : ''}
    />
  </svg>
)

export const NotificationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <path
      d="M8.49865 12.5C8.49865 12.6326 8.44597 12.7598 8.35221 12.8536C8.25844 12.9473 8.13126 13 7.99865 13H3.99865C3.86604 13 3.73887 12.9473 3.6451 12.8536C3.55133 12.7598 3.49865 12.6326 3.49865 12.5C3.49865 12.3674 3.55133 12.2402 3.6451 12.1464C3.73887 12.0527 3.86604 12 3.99865 12H7.99865C8.13126 12 8.25844 12.0527 8.35221 12.1464C8.44597 12.2402 8.49865 12.3674 8.49865 12.5ZM11.8643 10.5C11.7775 10.6528 11.6516 10.7797 11.4994 10.8676C11.3472 10.9555 11.1744 11.0012 10.9987 11H0.998651C0.822861 10.9998 0.65024 10.9532 0.498186 10.865C0.346132 10.7768 0.220019 10.65 0.132557 10.4975C0.0450948 10.345 -0.000624588 10.1722 6.44479e-06 9.99641C0.000637477 9.82062 0.0475967 9.64811 0.136151 9.49625C0.483026 8.89875 0.998651 7.20875 0.998651 5C0.998651 3.67392 1.52544 2.40215 2.46312 1.46447C3.4008 0.526784 4.67257 0 5.99865 0C7.32473 0 8.5965 0.526784 9.53419 1.46447C10.4719 2.40215 10.9987 3.67392 10.9987 5C10.9987 7.20813 11.5149 8.89875 11.8618 9.49625C11.9512 9.64831 11.9985 9.82146 11.9989 9.99787C11.9992 10.1743 11.9525 10.3476 11.8637 10.5H11.8643ZM10.9987 10C10.5155 9.17062 9.99865 7.25313 9.99865 5C9.99865 3.93913 9.57722 2.92172 8.82708 2.17157C8.07693 1.42143 7.05952 1 5.99865 1C4.93779 1 3.92037 1.42143 3.17022 2.17157C2.42008 2.92172 1.99865 3.93913 1.99865 5C1.99865 7.25375 1.48115 9.17125 0.998651 10H10.9987Z"
      fill="#FAFAF9"
    />
  </svg>
)
