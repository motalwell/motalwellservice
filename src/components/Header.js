function Logo({ company }) {
  return (
    <div className="logo">
      <div className="logo-icon">{company.logoIcon}</div>
      {company.logoPrimary} <span>&nbsp;{company.logoSecondary}</span>
    </div>
  );
}

export default function Header({ company, navigation }) {
  return (
    <>
      <div className="topbar">
        <span className="license-badge">{company.licenseBadge}</span>
        <div>
          <a href={`tel:${company.phoneLink}`}>📞 {company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}>✉ 111{company.email}</a>
        </div>
      </div>

      <nav>
        <Logo company={company} />
        <ul>
          {navigation.map((item) => (
            <li key={item.id}>
              <a href={item.href} className={item.isCta ? 'nav-cta' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
