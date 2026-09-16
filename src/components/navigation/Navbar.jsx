import React, { useEffect, useState } from "react";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19 19l-4-4" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        /* =========================================
           NAVBAR
           ========================================= */

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;

          width: 100%;
          z-index: 1000;

          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.85),
            rgba(0, 0, 0, 0)
          );

          transition:
            background-color 0.25s ease,
            backdrop-filter 0.25s ease;
        }

        .navbar--solid {
          background: rgba(5, 5, 5, 0.94);

          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }


        /* =========================================
           NAVBAR INNER
           ========================================= */

        .navbar__inner {
          width: 100%;
          max-width: 1400px;

          min-height: 64px;

          margin: 0 auto;
          padding: 0 3rem;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 2rem;
        }


        /* =========================================
           LEFT SIDE
           ========================================= */

        .navbar__left {
          display: flex;
          align-items: center;

          gap: 2.75rem;

          min-width: 0;
        }


        /* =========================================
           LOGO
           ========================================= */

        .navbar__logo {
          flex-shrink: 0;

          font-weight: 800;
          font-size: 1.15rem;

          letter-spacing: 0.06em;

          color: #e50914;

          text-decoration: none;

          white-space: nowrap;
        }

        .navbar__logo:hover {
          color: #f6121d;
        }


        /* =========================================
           DESKTOP NAVIGATION
           ========================================= */

        .navbar__links {
          display: flex;
          align-items: center;

          gap: 1.75rem;
        }

        .navbar__link {
          color: #b3b3b3;

          text-decoration: none;

          font-size: 0.9rem;
          font-weight: 500;

          padding: 0.2rem 0;

          white-space: nowrap;

          border-bottom: 2px solid transparent;

          transition: color 0.15s ease;
        }

        .navbar__link:hover {
          color: #ffffff;
        }

        .navbar__link--active {
          color: #ffffff;

          border-bottom-color: #e50914;
        }


        /* =========================================
           RIGHT SIDE
           ========================================= */

        .navbar__right {
          display: flex;
          align-items: center;

          gap: 0.8rem;

          flex-shrink: 0;
        }


        /* =========================================
           SEARCH BUTTON
           ========================================= */

        .icon-btn {
          width: 34px;
          height: 34px;

          padding: 0;

          border: none;
          background: transparent;

          color: #b3b3b3;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          color: #ffffff;
        }


        /* =========================================
           MOBILE MENU BUTTON
           ========================================= */

        .menu-btn {
          display: none;

          width: 34px;
          height: 34px;

          padding: 0;

          border: none;
          background: transparent;

          color: #b3b3b3;

          cursor: pointer;

          align-items: center;
          justify-content: center;
        }

        .menu-btn:hover {
          color: #ffffff;
        }


        /* =========================================
           PROFILE
           ========================================= */

        .profile-badge {
          width: 32px;
          height: 32px;

          padding: 0;

          border: none;
          border-radius: 6px;

          background: #222222;

          color: #ffffff;

          font-weight: 700;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-badge:hover {
          background: #2c2c2c;
        }


        /* =========================================
           FOCUS
           ========================================= */

        .navbar__link:focus-visible,
        .navbar__logo:focus-visible,
        .icon-btn:focus-visible,
        .menu-btn:focus-visible,
        .profile-badge:focus-visible {
          outline: 2px solid #e50914;
          outline-offset: 3px;
        }


        /* =========================================
           MOBILE MENU
           ========================================= */

        .mobile-menu {
          display: none;
        }


        /* =========================================
           TABLET
           ========================================= */

        @media (max-width: 1199px) {

          .navbar__inner {
            padding-left: 2rem;
            padding-right: 2rem;

            gap: 1.5rem;
          }

          .navbar__left {
            gap: 2rem;
          }

          .navbar__links {
            gap: 1.25rem;
          }
        }


        /* =========================================
           MOBILE
           ========================================= */

        @media (max-width: 767px) {

          .navbar__inner {
            min-height: 58px;

            padding: 0 1rem;

            gap: 1rem;
          }


          /* Logo */
          .navbar__left {
            flex: 1;

            min-width: 0;

            gap: 0;
          }

          .navbar__logo {
            font-size: 1rem;

            letter-spacing: 0.05em;
          }


          /* Hide desktop links */
          .navbar__links {
            display: none;
          }


          /* Right controls */
          .navbar__right {
            gap: 0.3rem;
          }


          /* Show hamburger */
          .menu-btn {
            display: flex;
          }


          .icon-btn {
            width: 32px;
            height: 32px;
          }


          .profile-badge {
            width: 30px;
            height: 30px;

            border-radius: 5px;

            font-size: 0.85rem;
          }


          /* =====================================
             MOBILE DROPDOWN
             ===================================== */

          .mobile-menu {
            display: flex;

            flex-direction: column;

            width: 100%;

            padding: 0.5rem 1rem 0.8rem;

            background: rgba(5, 5, 5, 0.97);

            border-top: 1px solid rgba(255, 255, 255, 0.08);

            box-shadow:
              0 10px 25px rgba(0, 0, 0, 0.35);

            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }


          .mobile-menu a {
            position: relative;

            color: #b3b3b3;

            text-decoration: none;

            font-size: 0.95rem;
            font-weight: 500;

            padding: 0.85rem 0.25rem;

            border-bottom: 1px solid rgba(255, 255, 255, 0.06);

            transition:
              color 0.15s ease,
              padding-left 0.15s ease;
          }

          .mobile-menu a:last-child {
            border-bottom: none;
          }

          .mobile-menu a:hover {
            color: #ffffff;

            padding-left: 0.5rem;
          }


          /* Active mobile page */
          .mobile-menu__active {
            color: #ffffff !important;
          }

          .mobile-menu__active::before {
            content: "";

            display: inline-block;

            width: 5px;
            height: 5px;

            margin-right: 0.6rem;
            margin-bottom: 2px;

            border-radius: 50%;

            background: #e50914;
          }
        }


        /* =========================================
           VERY SMALL PHONES
           ========================================= */

        @media (max-width: 380px) {

          .navbar__inner {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }

          .navbar__logo {
            font-size: 0.92rem;
          }

          .navbar__right {
            gap: 0.15rem;
          }

          .menu-btn,
          .icon-btn {
            width: 30px;
            height: 30px;
          }

          .profile-badge {
            width: 29px;
            height: 29px;
          }
        }
      `}</style>


      {/* =========================================
          NAVBAR
          ========================================= */}

      <header className={`navbar ${scrolled ? "navbar--solid" : ""}`}>

        <div className="navbar__inner">

          {/* LEFT */}
          <div className="navbar__left">

            <a
              href="/"
              className="navbar__logo"
            >
              INTERNFLIX
            </a>


            {/* DESKTOP NAVIGATION */}
            <nav
              className="navbar__links"
              aria-label="Primary"
            >

              <a
                href="/"
                className={`navbar__link ${
                  currentPath === "/"
                    ? "navbar__link--active"
                    : ""
                }`}
                aria-current={
                  currentPath === "/"
                    ? "page"
                    : undefined
                }
              >
                Home
              </a>


              <a
                href="/journey"
                className={`navbar__link ${
                  currentPath === "/journey"
                    ? "navbar__link--active"
                    : ""
                }`}
                aria-current={
                  currentPath === "/journey"
                    ? "page"
                    : undefined
                }
              >
                Journey
              </a>


              <a
                href="/whats-next"
                className={`navbar__link ${
                  currentPath === "/whats-next"
                    ? "navbar__link--active"
                    : ""
                }`}
                aria-current={
                  currentPath === "/whats-next"
                    ? "page"
                    : undefined
                }
              >
                What&rsquo;s Next
              </a>

            </nav>

          </div>


          {/* RIGHT */}
          <div className="navbar__right">

            {/* MOBILE MENU */}
            <button
              className="menu-btn"
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={menuOpen}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon />
            </button>


            {/* SEARCH */}
            <button
              className="icon-btn"
              aria-label="Search"
              type="button"
            >
              <SearchIcon />
            </button>


            {/* PROFILE */}
            <button
              className="profile-badge"
              aria-label="About the author"
              type="button"
            >
              A
            </button>

          </div>

        </div>


        {/* =========================================
            MOBILE NAVIGATION MENU
            ========================================= */}

        {menuOpen && (
          <nav
            className="mobile-menu"
            aria-label="Mobile navigation"
          >

            <a
              href="/"
              className={
                currentPath === "/"
                  ? "mobile-menu__active"
                  : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>


            <a
              href="/journey"
              className={
                currentPath === "/journey"
                  ? "mobile-menu__active"
                  : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              Journey
            </a>


            <a
              href="/whats-next"
              className={
                currentPath === "/whats-next"
                  ? "mobile-menu__active"
                  : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              What&rsquo;s Next
            </a>

          </nav>
        )}

      </header>
    </>
  );
}