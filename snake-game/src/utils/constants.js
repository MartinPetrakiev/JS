const BOARD_MIN = 0;
const BOARD_MAX = 40;
const SNAKE_DOT_SIZE = 2;

const KEYBOARD_KEYS = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    PAUSE: 32,
};

const MOVE_DIRECTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};

const INITIAL_SNAKE_DOTS = [
    [2, 2],
    [2, 4],
    [2, 6],
    [2, 8],
];

const OBSTACLE_SIZE = 2;

const GAME_HISOTRY = "gameHistory";

const SVGS = [
    <svg viewBox="0 0 1110 1110">
        <path
            style={{ fill: "#88C057" }}
            d="M18.437,23.954l1.359,4.53c0.182,1.143-0.583,2.25-1.683,2.61l-1.119,0.366l-0.321,0.994 c-0.421,1.305-1.365,2.315-2.673,2.723c-1.154,0.36-3.667-2.233-4.693-2.093L0,42.391c11.761,11.014,30.223,10.789,41.701-0.689 S53.404,11.761,42.391,0L18.437,23.954z"
        ></path>
        <path
            style={{ fill: "#E22F37" }}
            d="M37.087,5.303l-18.65,18.65l1.359,4.53c0.182,1.143-0.583,2.25-1.683,2.61l-1.119,0.366 l-0.321,0.994c-0.421,1.305-1.365,2.315-2.673,2.723c-1.154,0.36-3.667-2.233-4.693-2.093l-4.004,4.004c0,0.002,0,0.003,0,0.005 c8.774,9.557,22.429,8.679,31.448-0.341s9.898-22.674,0.341-31.448C37.091,5.303,37.089,5.303,37.087,5.303z"
        ></path>
        <circle
            style={{ fill: "#231F20" }}
            cx="4.5"
            cy="16.984"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="16.5"
            cy="38.984"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="25.968"
            cy="25.615"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="30.918"
            cy="20.665"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="28.09"
            cy="37.636"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="33.039"
            cy="32.686"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="37.989"
            cy="27.736"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="35.868"
            cy="15.715"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="22.433"
            cy="36.221"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="27.5"
            cy="30.984"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="32.5"
            cy="25.984"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="7.5"
            cy="26.984"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="13.5"
            cy="18.984"
            r="1.5"
        ></circle>
        <circle
            style={{ fill: "#231F20" }}
            cx="37.282"
            cy="21.372"
            r="1.5"
        ></circle>
    </svg>,
    <svg viewBox="0 0 1110 1110">
        <path
            style={{ fill: "yellow" }}
            d="M6.778,48.389c5.405,2.064,19.532,1.489,34.784-15.369c6.72-7.428,10.578-20.009,3.197-30.103l-1.202-1.281 c-0.405,0.288-0.542,0.829-0.311,1.273l2.584,4.964c0.042,0.132,0.088,0.266,0.134,0.4c0.163,0.478,0.332,0.971,0.334,1.335 c0.06,9.503-7.321,20.197-20.251,29.341c-4.887,3.456-8.726,5.934-12.762,7.611c-1.793,0.745-3.611,1.325-5.559,1.772 c-0.381,0.089-0.734,0.071-1.066-0.01L6.778,48.389z"
        ></path>
        <path
            style={{ fill: "yellow" }}
            d="M52.561,8.584c-0.648-1.107-1.414-2.172-2.34-3.253l-3.047-4.861c-0.144-0.228-0.372-0.389-0.636-0.446 c-0.262-0.058-0.537-0.006-0.763,0.142l-0.529,0.349l1.012,1.079c0.027,0.029,0.053,0.06,0.076,0.092 c8.093,11.006,3.968,24.654-3.291,32.677C31.082,47.584,19.788,51.264,12.242,51.264c-2.558,0-4.684-0.422-6.261-1.04 c-0.047-0.018-0.092-0.04-0.135-0.065l-4.801-2.767c-0.25,0.618-0.387,1.31-0.417,1.891c-0.014,0.273,0.084,0.54,0.272,0.738 c3.969,4.202,9.008,6.333,14.976,6.333c6.335,0,13.631-2.392,21.682-7.109C53.496,39.907,60.226,21.667,52.561,8.584z"
        ></path>
        <path
            style={{ fill: "yellow" }}
            d="M5.126,47.437c-0.232-0.208-0.447-0.427-0.645-0.633c-0.529-0.551-0.948-0.987-1.614-1.004 c-0.16,0-0.305,0.035-0.446,0.078L5.126,47.437z"
        ></path>
    </svg>,
    <svg viewBox="0 0 1110 1110">
        <path
            style={{ fill: "#003879" }}
            d="M39.685,2.953c-7.524,0-13.623,6.099-13.623,13.623c0,2.243,0.552,4.353,1.512,6.219 c1.496-0.565,3.11-0.888,4.804-0.888c5.281,0,9.851,3.011,12.111,7.404c5.15-1.944,8.819-6.905,8.819-12.735 C53.308,9.052,47.208,2.953,39.685,2.953z"
        ></path>
        <path
            style={{ fill: "#1A49C1" }}
            d="M18.754,35.53c0-5.652,3.443-10.499,8.345-12.561c-0.927-6.622-6.598-11.723-13.475-11.723 C6.099,11.245,0,17.344,0,24.868c0,7.524,6.099,13.623,13.623,13.623c1.872,0,3.655-0.379,5.279-1.062 C18.814,36.807,18.754,36.176,18.754,35.53z"
        ></path>
        <circle
            style={{ fill: "#415CCE" }}
            cx="32.577"
            cy="35.53"
            r="14.825"
        ></circle>
        <path
            style={{ fill: "#121C60" }}
            d="M28.103,32.153c-0.317,0-0.629-0.15-0.824-0.432c-0.314-0.454-0.2-1.077,0.254-1.391l2.841-1.964 c1.132-0.781,2.656-0.705,3.704,0.186l2.165,1.839c0.421,0.357,0.472,0.989,0.115,1.41c-0.358,0.421-0.989,0.473-1.41,0.115 l-2.165-1.839c-0.355-0.302-0.89-0.328-1.272-0.064l-2.841,1.964C28.497,32.095,28.299,32.153,28.103,32.153z"
        ></path>
        <path
            style={{ fill: "#121C60" }}
            d="M28.606,28.597h-2.355c-0.552,0-1-0.448-1-1s0.448-1,1-1h2.355c0.48,0,0.81-0.283,0.839-0.398 l0.45-1.788c0.135-0.536,0.679-0.859,1.214-0.726c0.536,0.135,0.86,0.678,0.726,1.214l-0.45,1.788 C31.109,27.776,29.915,28.597,28.606,28.597z"
        ></path>
        <path
            style={{ fill: "#121C60" }}
            d="M37.842,28.597c-0.029,0-0.059-0.001-0.089-0.004l-2.894-0.256 c-1.329-0.118-2.405-1.042-2.502-2.149l-0.126-1.446c-0.048-0.55,0.359-1.035,0.909-1.083c0.564-0.059,1.035,0.36,1.083,0.909 l0.126,1.445c0.025,0.069,0.27,0.294,0.686,0.331l2.895,0.256c0.55,0.049,0.957,0.534,0.908,1.084 C38.791,28.205,38.355,28.597,37.842,28.597z"
        ></path>
        <path
            style={{ fill: "#121C60" }}
            d="M9.262,21.651c-0.317,0-0.629-0.15-0.824-0.432c-0.314-0.454-0.2-1.077,0.254-1.391l2.841-1.964 c1.132-0.781,2.656-0.704,3.704,0.186l2.165,1.838c0.421,0.357,0.472,0.988,0.115,1.41s-0.988,0.471-1.41,0.115l-2.166-1.839 c-0.354-0.301-0.889-0.329-1.271-0.064L9.83,21.474C9.656,21.593,9.458,21.651,9.262,21.651z"
        ></path>
        <path
            style={{ fill: "#121C60" }}
            d="M9.765,18.095H7.41c-0.552,0-1-0.448-1-1s0.448-1,1-1h2.355c0.48,0,0.81-0.283,0.839-0.398 l0.45-1.788c0.135-0.536,0.678-0.86,1.214-0.726c0.536,0.135,0.86,0.678,0.726,1.214l-0.45,1.788 C12.269,17.274,11.074,18.095,9.765,18.095z"
        ></path>
        <path
            style={{ fill: "#121C60" }}
            d="M19.001,18.095c-0.029,0-0.059-0.001-0.089-0.004l-2.894-0.256 c-1.329-0.118-2.405-1.042-2.502-2.149l-0.126-1.445c-0.048-0.55,0.359-1.036,0.909-1.083c0.565-0.057,1.036,0.359,1.083,0.909 l0.126,1.445c0.025,0.069,0.27,0.295,0.686,0.332l2.895,0.256c0.55,0.049,0.957,0.534,0.908,1.084 C19.95,17.703,19.514,18.095,19.001,18.095z"
        ></path>
        <path
            style={{ fill: "#0A1135" }}
            d="M35.262,13.153c-0.317,0-0.629-0.15-0.824-0.432c-0.314-0.454-0.2-1.077,0.254-1.391l2.841-1.964 c1.132-0.782,2.655-0.704,3.704,0.186l2.165,1.838c0.421,0.357,0.472,0.988,0.115,1.41s-0.989,0.472-1.41,0.115l-2.166-1.839 c-0.354-0.301-0.888-0.328-1.271-0.064l-2.841,1.964C35.656,13.095,35.458,13.153,35.262,13.153z"
        ></path>
        <path
            style={{ fill: "#0A1135" }}
            d="M35.765,9.597H33.41c-0.552,0-1-0.448-1-1s0.448-1,1-1h2.355c0.48,0,0.81-0.283,0.839-0.398 l0.45-1.788c0.135-0.536,0.677-0.86,1.214-0.726c0.536,0.135,0.86,0.678,0.726,1.214l-0.45,1.788 C38.269,8.776,37.074,9.597,35.765,9.597z"
        ></path>
        <path
            style={{ fill: "#0A1135" }}
            d="M45.001,9.597c-0.029,0-0.059-0.001-0.089-0.004l-2.894-0.256c-1.329-0.118-2.405-1.042-2.502-2.149 l-0.126-1.445c-0.048-0.55,0.359-1.036,0.909-1.083c0.563-0.057,1.036,0.359,1.083,0.909l0.126,1.445 c0.025,0.069,0.27,0.295,0.686,0.332l2.895,0.256c0.55,0.049,0.957,0.534,0.908,1.084C45.95,9.205,45.514,9.597,45.001,9.597z"
        ></path>
        <path
            style={{ fill: "#3265D6" }}
            d="M7.022,32.153c-0.174,0-0.352-0.045-0.512-0.142c-4.247-2.539-3.635-9.125-3.607-9.404 c0.056-0.549,0.55-0.942,1.094-0.895c0.549,0.055,0.95,0.544,0.896,1.093c-0.005,0.056-0.51,5.604,2.643,7.489 c0.474,0.283,0.628,0.897,0.345,1.372C7.693,31.979,7.362,32.153,7.022,32.153z"
        ></path>
        <path
            style={{ fill: "#447CE0" }}
            d="M24.35,43.307c-0.175,0-0.352-0.045-0.512-0.142c-4.247-2.539-3.635-9.125-3.607-9.404 c0.056-0.549,0.55-0.944,1.094-0.895c0.549,0.055,0.95,0.544,0.896,1.093c-0.005,0.056-0.51,5.604,2.643,7.489 c0.474,0.283,0.628,0.897,0.345,1.372C25.022,43.133,24.69,43.307,24.35,43.307z"
        ></path>
        <path
            style={{ fill: "#1951A3" }}
            d="M29.743,20.366c-0.324,0-0.642-0.157-0.834-0.448c-2.733-4.125,0.665-9.8,0.811-10.04 c0.288-0.471,0.902-0.62,1.373-0.333c0.471,0.287,0.622,0.901,0.335,1.373c-0.029,0.048-2.881,4.833-0.853,7.896 c0.305,0.46,0.179,1.081-0.281,1.386C30.124,20.313,29.932,20.366,29.743,20.366z"
        ></path>
    </svg>,
    <svg viewBox="0 0 1110 1110">
        <path
            style={{ fill: "#88C057" }}
            d="M40.47,8.458c-2.562-1.642-7.374-3.93-11.997-1.816c-0.445,0.204-0.952-0.117-0.952-0.607V1.786 C27.522,0.804,26.855,0,26.04,0h-2.223c-0.815,0-1.482,0.804-1.482,1.786v4.501c0,0.425-0.385,0.747-0.802,0.661 c-1.877-0.387-6.751-0.989-11.412,1.795c-0.638,0.381-0.268,1.381,0.464,1.247c2.17-0.397,5.026-0.67,6.956,0.092 c0.506,0.199,0.579,0.891,0.124,1.189c-1.371,0.895-3.9,2.953-5.557,6.737c-0.282,0.644,0.51,1.221,1.053,0.774 c2.117-1.744,5.6-4.107,8.554-3.726c0.348,0.045,0.612,0.329,0.607,0.68c-0.03,1.982-0.005,8.716,1.632,11.265 c0.258,0.402,0.836,0.422,1.117,0.035c1.043-1.433,3.304-5.233,3.211-11.167c-0.006-0.39,0.307-0.707,0.697-0.694 c1.49,0.048,5.008,0.469,7.798,3.194c0.457,0.447,1.214,0.061,1.134-0.573c-0.219-1.735-1.174-4.359-4.631-6.394 c-0.525-0.309-0.436-1.095,0.155-1.24c1.194-0.293,3.252-0.572,6.644-0.46C40.768,9.723,41.049,8.829,40.47,8.458z"
        ></path>
        <path
            style={{ fill: "#D13834" }}
            d="M41.248,9.99c-0.093-0.065-0.201-0.106-0.314-0.12c-0.4-0.049-0.801-0.095-1.201-0.149 c-0.143-0.014-0.287-0.025-0.429-0.039c-2.914-0.048-4.743,0.206-5.846,0.474c-0.599,0.146-0.707,0.931-0.175,1.244 c3.457,2.035,4.411,4.659,4.63,6.393c0.08,0.634-0.677,1.02-1.134,0.573c-2.79-2.724-6.308-3.145-7.798-3.194 c-0.39-0.013-0.704,0.304-0.697,0.694c0.092,5.934-2.168,9.734-3.211,11.167c-0.282,0.387-0.859,0.367-1.117-0.035 c-1.637-2.549-1.662-9.283-1.632-11.265c0.005-0.35-0.259-0.635-0.607-0.68c-2.954-0.382-6.437,1.982-8.554,3.726 c-0.543,0.447-1.335-0.13-1.053-0.774c1.655-3.779,4.18-5.836,5.552-6.733c0.457-0.299,0.381-0.994-0.128-1.19 c-0.371-0.143-0.776-0.249-1.203-0.324c-0.076-0.014-0.157-0.015-0.234-0.004c-2.425,0.33-4.807,0.791-7.119,1.411 c-0.102,0.027-0.197,0.076-0.278,0.144c-5.103,4.246-8.307,10.359-8.307,17.156c0,12.821,11.393,23.214,25.446,23.214 s25.446-10.393,25.446-23.214C51.286,20.928,47.348,14.23,41.248,9.99z"
        ></path>
        <path
            style={{ fill: "#ED7161" }}
            d="M5.791,34.636c-0.342,0-0.675-0.175-0.861-0.49C4.182,32.883,3.692,31.488,3.473,30 c-0.08-0.547,0.298-1.055,0.844-1.135c0.556-0.086,1.055,0.298,1.135,0.844c0.178,1.213,0.593,2.395,1.199,3.418 c0.281,0.475,0.125,1.089-0.351,1.37C6.14,34.591,5.964,34.636,5.791,34.636z"
        ></path>
        <path
            style={{ fill: "#ED7161" }}
            d="M4.588,26.678c-0.023,0-0.047-0.001-0.07-0.003c-0.552-0.038-0.967-0.516-0.929-1.066 c0.094-1.327,0.366-2.616,0.811-3.834c0.189-0.519,0.761-0.783,1.283-0.596c0.519,0.189,0.785,0.764,0.596,1.283 c-0.381,1.041-0.614,2.146-0.694,3.285C5.548,26.275,5.109,26.678,4.588,26.678z"
        ></path>
    </svg>,
];

const DISCO_BALL_SVG = (
    <svg viewBox="0 0 11100 11100" fill="#000000">
        <g id="SVGRepo_iconCarrier">
            {" "}
            <polygon
                style={{ fill: "#FD5E95" }}
                points="297.152,102.079 228.743,102.079 228.743,50.772 297.152,50.772 297.152,93.528 "
            ></polygon>{" "}
            <rect
                x="228.743"
                y="50.772"
                style={{ fill: "#D14D7B" }}
                width="17.102"
                height="51.307"
            ></rect>{" "}
            <path
                style={{ fill: "#FD5E95" }}
                d="M380.452,193.591c53.033,23.19,87.723,61.643,87.723,105.165 c0-113.344-91.883-205.228-205.228-205.228C312.882,93.528,356.563,133.661,380.452,193.591z"
            ></path>{" "}
            <path
                style={{ fill: "#B169BF" }}
                d="M380.452,403.921c-23.89,59.93-67.57,100.062-117.505,100.062 c113.344,0,205.228-91.883,205.228-205.228C468.175,342.278,433.486,380.731,380.452,403.921z"
            ></path>{" "}
            <g>
                {" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M145.443,403.921C92.41,380.731,57.72,342.278,57.72,298.756 c0,113.344,91.883,205.228,205.228,205.228C213.013,503.983,169.333,463.851,145.443,403.921z"
                ></path>{" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M145.443,193.591c23.89-59.93,67.57-100.062,117.505-100.062 c-113.344,0-205.228,91.883-205.228,205.228C57.72,255.234,92.41,216.78,145.443,193.591z"
                ></path>{" "}
            </g>{" "}
            <g>
                {" "}
                <path
                    style={{ fill: "#FD8EB4" }}
                    d="M380.452,193.591c8.769,21.998,14.871,46.66,17.636,72.99c42.955,7.836,70.087,19.345,70.087,32.175 C468.175,255.234,433.486,216.78,380.452,193.591z"
                ></path>{" "}
                <path
                    style={{ fill: "#FD8EB4" }}
                    d="M127.808,266.58c2.764-26.329,8.866-50.993,17.636-72.99C92.41,216.78,57.72,255.234,57.72,298.756 C57.72,285.926,84.853,274.417,127.808,266.58z"
                ></path>{" "}
            </g>{" "}
            <path
                style={{ fill: "#FD5E95" }}
                d="M398.088,330.932c-2.764,26.329-8.866,50.993-17.636,72.99 c53.033-23.191,87.723-61.644,87.723-105.166C468.175,311.586,441.043,323.094,398.088,330.932z"
            ></path>{" "}
            <path
                style={{ fill: "#D14D7B" }}
                d="M145.443,403.921c-8.769-21.998-14.872-46.66-17.636-72.99 c-42.955-7.836-70.087-19.345-70.087-32.175C57.72,342.278,92.41,380.731,145.443,403.921z"
            ></path>{" "}
            <path
                style={{ fill: "#B169BF" }}
                d="M398.088,266.58c1.101,10.484,1.678,21.228,1.678,32.176c0,10.948-0.577,21.692-1.678,32.176 c42.955-7.837,70.087-19.346,70.087-32.176C468.175,285.926,441.043,274.417,398.088,266.58z"
            ></path>{" "}
            <path
                style={{ fill: "#FD5E95" }}
                d="M127.808,330.932c-1.101-10.484-1.678-21.227-1.678-32.176c0-10.948,0.577-21.692,1.678-32.176 c-42.955,7.837-70.087,19.346-70.087,32.176C57.72,311.586,84.853,323.094,127.808,330.932z"
            ></path>{" "}
            <g>
                {" "}
                <path
                    style={{ fill: "#DBA2D6" }}
                    d="M380.452,403.921c-24.555,10.737-53.041,18.197-83.842,21.375 c-7.826,47.906-19.996,78.688-33.663,78.688C312.882,503.983,356.563,463.851,380.452,403.921z"
                ></path>{" "}
                <path
                    style={{ fill: "#DBA2D6" }}
                    d="M296.611,172.216c30.801,3.177,59.287,10.638,83.842,21.375 c-23.89-59.93-67.57-100.062-117.505-100.062C276.615,93.528,288.784,124.31,296.611,172.216z"
                ></path>{" "}
            </g>{" "}
            <path
                style={{ fill: "#FD8EB4" }}
                d="M145.443,193.591c24.555-10.737,53.041-18.197,83.842-21.375 c7.826-47.906,19.996-78.688,33.663-78.688C213.013,93.528,169.333,133.661,145.443,193.591z"
            ></path>{" "}
            <path
                style={{ fill: "#844A8F" }}
                d="M229.285,425.296c-30.801-3.177-59.287-10.638-83.842-21.375 c23.89,59.93,67.57,100.062,117.505,100.062C249.281,503.983,237.112,473.201,229.285,425.296z"
            ></path>{" "}
            <g>
                {" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M398.088,266.58c-2.764-26.329-8.866-50.993-17.636-72.99 c-24.555-10.737-53.041-18.197-83.842-21.375c3.985,24.388,6.843,53.214,8.202,84.676 C340.059,258.414,371.992,261.819,398.088,266.58z"
                ></path>{" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M229.285,172.216c-30.801,3.177-59.287,10.638-83.842,21.375 c-8.769,21.998-14.872,46.66-17.636,72.99c26.096-4.761,58.028-8.167,93.276-9.688C222.442,225.43,225.3,196.604,229.285,172.216z"
                ></path>{" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M127.808,330.932c2.764,26.329,8.866,50.993,17.636,72.99 c24.555,10.737,53.041,18.197,83.842,21.375c-3.985-24.387-6.843-53.213-8.202-84.676 C185.837,339.098,153.904,335.692,127.808,330.932z"
                ></path>{" "}
            </g>{" "}
            <path
                style={{ fill: "#FD8EB4" }}
                d="M304.812,340.62c-1.359,31.463-4.217,60.288-8.202,84.676c30.801-3.177,59.287-10.638,83.842-21.375 c8.769-21.998,14.871-46.66,17.636-72.99C371.992,335.692,340.059,339.098,304.812,340.62z"
            ></path>{" "}
            <path
                style={{ fill: "#844A8F" }}
                d="M220.192,298.756c0-14.347,0.308-28.348,0.891-41.864c-35.248,1.522-67.18,4.928-93.276,9.688 c-1.101,10.484-1.678,21.228-1.678,32.176c0,10.948,0.577,21.692,1.678,32.176c26.096,4.761,58.028,8.167,93.276,9.688 C220.5,327.104,220.192,313.102,220.192,298.756z"
            ></path>{" "}
            <path
                style={{ fill: "#DBA2D6" }}
                d="M305.704,298.756c0,14.347-0.308,28.348-0.891,41.864c35.248-1.522,67.18-4.928,93.276-9.688 c1.101-10.484,1.678-21.227,1.678-32.176c0-10.948-0.577-21.692-1.678-32.176c-26.096-4.761-58.028-8.167-93.276-9.688 C305.396,270.408,305.704,284.409,305.704,298.756z"
            ></path>{" "}
            <g>
                {" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M229.285,172.216c10.954-1.13,22.197-1.727,33.663-1.727c11.466,0,22.709,0.598,33.663,1.727 c-7.826-47.906-19.996-78.688-33.663-78.688C249.281,93.528,237.112,124.31,229.285,172.216z"
                ></path>{" "}
                <path
                    style={{ fill: "#FD5E95" }}
                    d="M296.611,425.296c-10.954,1.13-22.197,1.727-33.663,1.727c-11.466,0-22.709-0.598-33.663-1.727 c7.826,47.906,19.996,78.688,33.663,78.688S288.784,473.201,296.611,425.296z"
                ></path>{" "}
            </g>{" "}
            <path
                style={{ fill: "#B169BF" }}
                d="M262.948,341.511c-14.347,0-28.348-0.308-41.864-0.891c1.359,31.463,4.217,60.288,8.202,84.676 c10.954,1.13,22.197,1.727,33.663,1.727c11.466,0,22.709-0.598,33.663-1.727c3.985-24.387,6.843-53.213,8.202-84.676 C291.296,341.204,277.294,341.511,262.948,341.511z"
            ></path>{" "}
            <path
                style={{ fill: "#FD8EB4" }}
                d="M262.948,256c14.347,0,28.348,0.308,41.864,0.891c-1.359-31.462-4.217-60.288-8.202-84.676 c-10.954-1.13-22.197-1.727-33.663-1.727c-11.466,0-22.709,0.598-33.663,1.727c-3.985,24.388-6.843,53.214-8.202,84.676 C234.6,256.308,248.601,256,262.948,256z"
            ></path>{" "}
            <path
                style={{ fill: "#FD5E95" }}
                d="M304.812,256.891c-13.516-0.584-27.518-0.891-41.864-0.891c-14.347,0-28.348,0.308-41.864,0.891 c-0.584,13.516-0.891,27.518-0.891,41.864c0,14.347,0.308,28.348,0.891,41.864c13.516,0.584,27.518,0.891,41.864,0.891 s28.348-0.308,41.864-0.891c0.584-13.516,0.891-27.518,0.891-41.864C305.704,284.409,305.396,270.408,304.812,256.891z"
            ></path>{" "}
            <g>
                {" "}
                <polygon
                    style={{ fill: "#FFE88A" }}
                    points="455.634,92.388 502.38,76.426 455.634,60.464 442.522,8.017 429.41,60.464 382.664,76.426 429.41,92.388 442.522,144.835 "
                ></polygon>{" "}
                <polygon
                    style={{ fill: "#FFE88A" }}
                    points="82.59,126.592 129.336,110.63 82.59,94.669 69.478,42.221 56.366,94.669 9.62,110.63 56.366,126.592 69.478,179.04 "
                ></polygon>{" "}
                <polygon
                    style={{ fill: "#FFE88A" }}
                    points="371.503,440.847 418.248,424.885 371.503,408.923 358.39,356.476 345.278,408.923 298.532,424.885 345.278,440.847 358.39,493.294 "
                ></polygon>{" "}
            </g>{" "}
            <path
                style={{ fill: "#D14D7B" }}
                d="M84.983,362.662c-17.337-18.815-27.263-40.634-27.263-63.906 c0,113.344,91.883,205.228,205.228,205.228c-11.736,0-23.121-2.244-33.991-6.413C160.997,480.157,106.642,428.812,84.983,362.662z"
            ></path>{" "}
            <path
                style={{ fill: "#B2325E" }}
                d="M75.569,316.21c-11.459-5.33-17.848-11.236-17.848-17.454c0,23.272,9.926,45.091,27.263,63.906 C80.133,347.848,76.924,332.293,75.569,316.21z"
            ></path>{" "}
            <path
                style={{ fill: "#D14D7B" }}
                d="M74.823,298.756c0-5.88,0.262-11.699,0.746-17.454c-11.46,5.33-17.848,11.236-17.848,17.454 s6.39,12.124,17.848,17.454C75.084,310.455,74.823,304.636,74.823,298.756z"
            ></path>{" "}
            <path
                style={{ fill: "#FD5E95" }}
                d="M84.983,234.85c-17.337,18.815-27.263,40.634-27.263,63.906c0-6.218,6.389-12.124,17.848-17.454 C76.924,265.217,80.133,249.664,84.983,234.85z"
            ></path>{" "}
            <path
                style={{ fill: "#D14D7B" }}
                d="M228.957,99.942c10.87-4.171,22.254-6.413,33.991-6.413c-113.344,0-205.228,91.883-205.228,205.228 c0-23.272,9.926-45.091,27.263-63.906C106.641,168.699,160.997,117.355,228.957,99.942z"
            ></path>{" "}
            <path d="M305.169,89.717V50.772c0-4.428-3.589-8.017-8.017-8.017h-26.188V8.017c0-4.428-3.589-8.017-8.017-8.017 s-8.017,3.588-8.017,8.017v34.739h-26.188c-4.427,0-8.017,3.588-8.017,8.017v38.944C123.298,109.364,49.704,195.624,49.704,298.756 C49.704,416.339,145.364,512,262.948,512c30.267,0,59.951-6.441,87.157-18.619l0.509,2.035c0.891,3.569,4.098,6.072,7.777,6.072 c3.679,0,6.885-2.503,7.777-6.072l2.93-11.718c11.606-6.659,22.63-14.425,32.889-23.255c3.356-2.888,3.735-7.95,0.847-11.306 c-2.888-3.355-7.95-3.736-11.306-0.847c-5.387,4.637-11.004,8.954-16.816,12.952l3.51-14.041l42.618-14.552 c3.245-1.108,5.426-4.158,5.426-7.587c0-3.429-2.182-6.479-5.426-7.587l-42.618-14.552l-12.054-48.215 c-0.891-3.569-4.098-6.072-7.777-6.072c-3.679,0-6.885,2.503-7.777,6.072l-12.054,48.215l-42.618,14.552 c-3.245,1.108-5.426,4.158-5.426,7.587c0,3.429,2.182,6.479,5.426,7.587l42.618,14.552l7.588,30.351 c-19.241,8.95-39.873,14.777-61.103,17.171c5.623-10.129,10.552-24.753,14.858-43.997c0.966-4.322-1.752-8.608-6.073-9.574 c-4.319-0.96-8.607,1.754-9.573,6.073c-8.901,39.786-18.608,48.741-21.307,48.741c-2.903,0-13.248-9.87-22.385-53.728 c-0.546-2.623-1.074-5.31-1.586-8.05c7.906,0.559,15.903,0.851,23.971,0.851c4.427,0,8.017-3.588,8.017-8.017 s-3.589-8.017-8.017-8.017c-9.016,0-17.934-0.378-26.716-1.104c-3.151-20.793-5.426-44.123-6.731-68.935 c10.96,0.37,22.135,0.561,33.447,0.561c11.306,0,22.473-0.191,33.428-0.56c-0.93,17.595-2.344,34.561-4.221,50.359 c-0.523,4.396,2.619,8.384,7.015,8.906c4.389,0.528,8.383-2.619,8.907-7.015c1.972-16.595,3.442-34.437,4.389-52.929 c27.632-1.408,53.551-3.996,76.364-7.642c-2.282,16.076-5.891,31.656-10.828,46.598c-1.388,4.204,0.894,8.738,5.098,10.127 c4.2,1.391,8.737-0.893,10.127-5.098c5.767-17.456,9.823-35.711,12.166-54.568c1.452-0.286,2.89-0.575,4.309-0.87 c20.226-4.214,35.736-9.071,46.68-14.631c-7.522,23.029-26.099,44.285-54.132,61.42c-3.779,2.309-4.968,7.243-2.659,11.021 c2.309,3.779,7.243,4.968,11.021,2.659c14.915-9.117,27.455-19.375,37.455-30.485c-4.532,12.338-10.291,24.24-17.26,35.51 c-2.329,3.765-1.164,8.706,2.602,11.034c3.765,2.327,8.706,1.163,11.035-2.603c20.771-33.588,31.75-72.319,31.75-112.006 C476.192,195.624,402.598,109.364,305.169,89.717z M323.34,425.063l24.529-8.376c2.574-0.879,4.527-3.004,5.186-5.642l5.335-21.338 l5.335,21.338c0.66,2.639,2.612,4.763,5.186,5.642l24.529,8.376l-24.529,8.376c-2.574,0.879-4.527,3.004-5.186,5.642l-5.335,21.338 l-5.335-21.338c-0.66-2.639-2.612-4.763-5.186-5.642L323.34,425.063z M388.814,256.862c-22.805-3.643-48.714-6.231-76.334-7.638 c-1.236-24.237-3.379-47.154-6.348-67.816c24.395,3.333,47.441,9.49,68.12,18.209C380.945,217.164,385.915,236.426,388.814,256.862z M394.612,209.463c3.141,1.733,6.217,3.525,9.204,5.392c27.13,16.956,45.153,37.866,52.546,60.442 c-10.942-5.557-26.448-10.411-46.661-14.622c-1.419-0.296-2.861-0.586-4.314-0.871C403.219,242.34,399.599,225.451,394.612,209.463z M65.737,298.756c0-2.89,9.795-13.156,53.155-22.263c-0.512,7.349-0.779,14.775-0.779,22.263c0,7.488,0.267,14.914,0.779,22.263 C75.532,311.912,65.737,301.646,65.737,298.756z M120.509,337.708c2.168,17.463,5.787,34.351,10.774,50.34 c-3.141-1.733-6.217-3.525-9.204-5.391c-27.13-16.956-45.153-37.866-52.546-60.442c10.942,5.557,26.448,10.411,46.661,14.622 C117.615,337.133,119.057,337.423,120.509,337.708z M69.534,275.297c7.392-22.576,25.415-43.486,52.546-60.442 c2.988-1.867,6.063-3.66,9.204-5.392c-4.987,15.989-8.607,32.877-10.774,50.34c-1.453,0.286-2.895,0.576-4.314,0.871 C95.98,264.886,80.476,269.74,69.534,275.297z M134.146,298.756c0-8.584,0.362-17.042,1.06-25.34 c22.871-3.87,49.239-6.619,77.53-8.107c-0.37,10.96-0.561,22.135-0.561,33.447c0,11.312,0.191,22.486,0.561,33.447 c-28.29-1.488-54.659-4.235-77.53-8.105C134.508,315.798,134.146,307.34,134.146,298.756z M137.081,256.862 c2.899-20.435,7.869-39.698,14.563-57.246c20.679-8.719,43.724-14.876,68.12-18.209c-2.968,20.662-5.113,43.579-6.348,67.816 C185.794,250.631,159.886,253.218,137.081,256.862z M285.333,155.273c0.546,2.623,1.074,5.311,1.586,8.05 c-7.906-0.559-15.903-0.851-23.971-0.851c-8.068,0-16.065,0.292-23.971,0.851c0.512-2.74,1.04-5.428,1.586-8.05 c9.137-43.858,19.482-53.728,22.385-53.728S276.196,111.415,285.333,155.273z M239.793,104.744 c-5.684,10.972-10.639,26.676-14.926,47.259c-0.867,4.159-1.689,8.47-2.472,12.906c-21.685,2.637-42.459,7.387-61.703,14.084 C179.779,140.876,207.732,113.692,239.793,104.744z M236.232,179.609c8.782-0.726,17.7-1.104,26.716-1.104 s17.934,0.378,26.716,1.104c3.151,20.793,5.426,44.123,6.731,68.935c-10.96-0.37-22.135-0.561-33.447-0.561 s-22.486,0.191-33.447,0.561C230.806,223.732,233.081,200.403,236.232,179.609z M303.501,164.909 c-0.783-4.436-1.605-8.747-2.472-12.906c-4.288-20.584-9.242-36.287-14.926-47.259c32.061,8.948,60.014,36.132,79.101,74.249 C345.959,172.296,325.185,167.546,303.501,164.909z M236.76,58.789h52.376v28.332c-8.584-1.056-17.322-1.61-26.188-1.61 s-17.604,0.554-26.188,1.61V58.789z M187.263,116.656c-9.996,9.02-19.307,19.901-27.73,32.535 c-7.835,11.751-14.628,24.634-20.329,38.384c-9.011,4.097-17.583,8.659-25.622,13.684c-14.149,8.843-26.114,18.734-35.727,29.415 C96.859,179.17,136.782,137.715,187.263,116.656z M77.854,366.838c9.613,10.68,21.578,20.572,35.727,29.415 c8.039,5.025,16.611,9.587,25.622,13.684c5.701,13.75,12.494,26.633,20.329,38.384c8.423,12.634,17.734,23.515,27.73,32.535 C136.782,459.796,96.859,418.341,77.854,366.838z M224.867,445.508c4.288,20.584,9.242,36.288,14.926,47.259 c-32.061-8.948-60.014-36.133-79.101-74.249c19.244,6.697,40.018,11.447,61.703,14.084 C223.177,437.039,224.001,441.349,224.867,445.508z M219.762,416.104c-24.395-3.333-47.441-9.49-68.12-18.209 c-6.692-17.548-11.664-36.811-14.562-57.246c22.805,3.644,48.714,6.231,76.334,7.638 C214.651,372.525,216.794,395.444,219.762,416.104z M262.948,333.495c-11.564,0-22.976-0.201-34.148-0.591 c-0.39-11.172-0.591-22.583-0.591-34.148s0.201-22.976,0.591-34.148c11.172-0.39,22.584-0.591,34.148-0.591 s22.976,0.201,34.148,0.591c0.39,11.172,0.591,22.583,0.591,34.148c0,11.485-0.205,22.909-0.603,34.148 C285.916,333.294,274.509,333.495,262.948,333.495z M313.155,332.202c0.375-11.02,0.565-22.207,0.565-33.447 c0-11.312-0.191-22.486-0.561-33.447c28.29,1.488,54.659,4.235,77.53,8.107c0.698,8.298,1.06,16.756,1.06,25.34 c0,8.554-0.362,17.005-1.06,25.341C367.817,327.968,341.447,330.715,313.155,332.202z M407.005,321.018 c0.51-7.344,0.778-14.766,0.778-22.262c0-7.487-0.267-14.913-0.779-22.263c43.361,9.107,53.155,19.373,53.155,22.263 C460.159,301.646,450.364,311.912,407.005,321.018z M412.314,201.259c-8.039-5.024-16.611-9.587-25.622-13.684 c-5.702-13.75-12.494-26.633-20.329-38.384c-8.423-12.634-17.734-23.515-27.73-32.535c50.481,21.059,90.404,62.513,109.408,114.018 C438.429,219.993,426.464,210.103,412.314,201.259z"></path>{" "}
            <path d="M504.971,68.839l-42.618-14.552L450.299,6.072C449.407,2.503,446.2,0,442.522,0s-6.885,2.503-7.777,6.072l-12.054,48.215 l-42.618,14.552c-3.245,1.108-5.426,4.158-5.426,7.587s2.182,6.479,5.426,7.587l42.618,14.552l12.054,48.215 c0.891,3.569,4.098,6.072,7.777,6.072c3.679,0,6.885-2.503,7.777-6.072l12.054-48.215l42.618-14.552 c3.245-1.108,5.426-4.158,5.426-7.587S508.215,69.947,504.971,68.839z M453.043,84.802c-2.574,0.879-4.527,3.004-5.186,5.642 l-5.335,21.338l-5.335-21.338c-0.659-2.639-2.612-4.763-5.186-5.642l-24.529-8.376l24.529-8.376 c2.574-0.879,4.527-3.004,5.186-5.642l5.335-21.338l5.335,21.338c0.66,2.639,2.612,4.763,5.186,5.642l24.529,8.376L453.043,84.802z"></path>{" "}
            <path d="M69.478,187.056c3.678,0,6.885-2.503,7.777-6.072l12.054-48.215l42.618-14.552c3.245-1.108,5.426-4.158,5.426-7.587 c0-3.429-2.182-6.479-5.426-7.587L89.309,88.492L77.255,40.277c-0.893-3.569-4.099-6.072-7.777-6.072s-6.885,2.503-7.777,6.072 L49.647,88.492L7.029,103.043c-3.208,1.097-5.426,4.196-5.426,7.587c0,3.391,2.218,6.49,5.426,7.587l42.618,14.552l12.054,48.215 C62.593,184.553,65.8,187.056,69.478,187.056z M34.428,110.63l24.529-8.376c2.574-0.879,4.527-3.004,5.186-5.642l5.335-21.338 l5.335,21.338c0.66,2.639,2.612,4.763,5.186,5.642l24.529,8.376l-24.529,8.376c-2.574,0.879-4.527,3.004-5.186,5.642l-5.335,21.338 l-5.335-21.338c-0.66-2.639-2.612-4.763-5.186-5.642L34.428,110.63z"></path>{" "}
        </g>
    </svg>
);

const WHISKEY_BOTTLE_SVG = (
    <svg viewBox="20 20 8500 8500" fill="#000000">
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></g>
        <g>
            {" "}
            <polygon
                style={{ fill: "#10744A" }}
                points="310.468,73.532 310.468,106.213 245.106,128 245.106,51.745 "
            ></polygon>{" "}
            <polygon
                style={{ fill: "#169B62" }}
                points="277.787,51.745 277.787,128 201.532,106.213 201.532,73.532 "
            ></polygon>{" "}
            <polygon
                style={{ fill: "#0B4E31" }}
                points="310.468,8.17 310.468,73.532 277.787,73.532 245.106,40.851 277.787,8.17 "
            ></polygon>{" "}
            <path
                style={{ fill: "#FFB88B" }}
                d="M403.064,446.802V247.83c0-17.974-12.68-40.132-28.171-49.25l-64.425-37.899v-54.468h-32.681 l-65.362,198.809L370.383,503.83h10.894c18.051,0,32.681-14.63,32.681-32.681C413.957,461.475,409.753,452.782,403.064,446.802z"
            ></path>{" "}
            <path
                style={{ fill: "#FFCFB2" }}
                d="M277.787,193.362v-87.149h-76.255v54.468l-64.425,37.899c-15.491,9.118-28.171,31.276-28.171,49.25 v198.972c-6.689,5.981-10.894,14.674-10.894,24.347c0,18.051,14.63,32.681,32.681,32.681h239.66v-32.685L277.787,193.362z"
            ></path>{" "}
            <path
                style={{ fill: "#FF6638" }}
                d="M370.383,247.83c0-6.405-6.536-17.833-12.059-21.079l-31.515-18.542l-57.921,122.413l68.815,140.528 h32.681v-57.736l-13.993-82.791L370.383,247.83z"
            ></path>{" "}
            <path
                style={{ fill: "#FF883E" }}
                d="M326.809,208.209l-49.021-28.837h-43.574l-80.536,47.379c-5.523,3.246-12.064,14.674-12.064,21.079 l35.841,82.792l-35.841,82.791v57.736h196.089V229.288C337.702,222.882,332.063,211.874,326.809,208.209z"
            ></path>{" "}
            <polygon
                style={{ fill: "#0B4E31" }}
                points="370.383,247.83 370.383,413.413 337.702,413.413 305.021,330.621 337.702,247.83 "
            ></polygon>{" "}
            <rect
                x="141.617"
                y="247.83"
                style={{ fill: "#169B62" }}
                width="196.085"
                height="165.583"
            ></rect>{" "}
            <rect
                x="201.532"
                y="8.17"
                style={{ fill: "#10744A" }}
                width="76.255"
                height="65.362"
            ></rect>{" "}
            <path d="M411.234,443.384V247.83c0-20.946-14.142-45.673-32.196-56.293l-60.4-35.53V8.17c0-4.512-3.658-8.17-8.17-8.17H201.532 c-4.512,0-8.17,3.658-8.17,8.17v147.837l-60.4,35.53c-18.054,10.62-32.196,35.346-32.196,56.293v195.555 c-6.963,7.519-10.894,17.442-10.894,27.765c0,22.526,18.325,40.851,40.851,40.851h250.553c22.526,0,40.851-18.325,40.851-40.851 C422.128,460.826,418.197,450.903,411.234,443.384z M209.702,81.702h92.596v16.34h-92.596V81.702z M302.298,16.34v49.021h-92.596 V16.34H302.298z M381.277,495.66H130.723c-13.516,0-24.511-10.995-24.511-24.511c0-6.958,2.978-13.616,8.172-18.265 c1.731-1.55,2.721-3.764,2.721-6.087V247.83c0-15.182,11.055-34.511,24.141-42.208l64.427-37.899 c2.496-1.467,4.027-4.147,4.027-7.042v-46.298h92.596v46.298c0,2.896,1.533,5.574,4.027,7.042l64.427,37.899 c13.085,7.697,24.141,27.027,24.141,42.208v198.966c0,2.324,0.989,4.537,2.721,6.087c5.194,4.65,8.172,11.308,8.172,18.265 C405.787,484.665,394.792,495.66,381.277,495.66z"></path>{" "}
            <path d="M316.494,310.246c-1.547-1.689-3.732-2.65-6.023-2.65s-4.475,0.961-6.023,2.65l-21.207,23.138l-21.208-23.138 c-1.547-1.689-3.732-2.65-6.022-2.65c-2.291,0-4.475,0.961-6.023,2.648l-21.219,23.141l-21.209-23.139 c-1.547-1.689-3.732-2.65-6.022-2.65c-2.291,0-4.475,0.961-6.023,2.648l-27.242,29.709c-3.049,3.326-2.826,8.494,0.5,11.544 c1.569,1.438,3.547,2.148,5.52,2.148c2.209,0,4.413-0.891,6.024-2.648l21.219-23.141l21.209,23.139 c1.547,1.688,3.732,2.65,6.022,2.65c2.291,0,4.475-0.961,6.023-2.648l21.22-23.141l21.209,23.139c1.547,1.688,3.732,2.65,6.023,2.65 s4.475-0.961,6.023-2.65l21.207-23.138l21.208,23.138c3.048,3.327,8.217,3.552,11.543,0.502c3.327-3.048,3.551-8.217,0.502-11.543 L316.494,310.246z"></path>{" "}
            <path d="M362.468,219.706l-80.539-47.375c-1.256-0.739-2.685-1.129-4.143-1.129h-43.574c-1.456,0-2.887,0.389-4.143,1.129 l-80.538,47.375c-7.97,4.689-16.09,18.882-16.09,28.124v165.583c0,4.512,3.658,8.17,8.17,8.17h220.601v41.391l-212.43,0.004v-16.885 c0-4.512-3.658-8.17-8.17-8.17c-4.512,0-8.17,3.658-8.17,8.17v25.055c0,2.167,0.861,4.245,2.393,5.777 c1.533,1.533,3.61,2.393,5.777,2.393l228.77-0.004c4.512,0,8.17-3.658,8.17-8.17V247.83 C378.553,238.587,370.435,224.393,362.468,219.706z M157.818,233.79l78.62-46.248h39.124l78.62,46.248 c1.411,0.83,3.266,3.216,4.84,5.869H152.976C154.55,237.006,156.406,234.62,157.818,233.79z M149.783,405.243V256h212.43v149.243 H149.783z"></path>{" "}
        </g>
    </svg>
);

const INITIAL_GAME_SPEED = 240;

const LEVEL_2 = 8;
const LEVEL_3 = 15;

const OFFSET_X_HALF = 16;
const OFFSET_X_FULL = 32;

const PLAY_BUTTON_TEXT = "Play";
const PLAY_AGAIN_BUTTON_TEXT = "Play again";

const SPEED_STEP_LVL_2 = 5;
const SPEED_STEP_LVL_N = 10;

const RAINBOW_COLORS = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
    "#FFA500",
    "#00FFFF",
    "#800080",
];

const GAME_OBJECT_TYPES = {
    OBSTACLE: "obstacle",
    FOOD: "food",
    SNAKE_SEGMENT: "snake-segment",
};

export {
    BOARD_MIN,
    BOARD_MAX,
    SNAKE_DOT_SIZE,
    KEYBOARD_KEYS,
    MOVE_DIRECTIONS,
    INITIAL_SNAKE_DOTS,
    SVGS,
    OBSTACLE_SIZE,
    GAME_HISOTRY,
    INITIAL_GAME_SPEED,
    LEVEL_2,
    LEVEL_3,
    OFFSET_X_HALF,
    OFFSET_X_FULL,
    PLAY_BUTTON_TEXT,
    PLAY_AGAIN_BUTTON_TEXT,
    SPEED_STEP_LVL_2,
    SPEED_STEP_LVL_N,
    RAINBOW_COLORS,
    DISCO_BALL_SVG,
    WHISKEY_BOTTLE_SVG,
    GAME_OBJECT_TYPES,
};
