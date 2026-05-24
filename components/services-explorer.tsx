"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { serviceDetails } from "@/data/home";
import { ButtonLink } from "./button-link";
import { CapabilityIcon } from "./capability-icon";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ServicesExplorer() {
  const serviceIds = useMemo(
    () => serviceDetails.map((service) => slugify(service.title)),
    []
  );
  const [activeService, setActiveService] = useState(serviceIds[0]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveService(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.2, 0.45, 0.65]
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  function scrollToService(serviceId: string) {
    const target = sectionRefs.current[serviceId];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setActiveService(serviceId);
    target?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  }

  return (
    <>
      <div className="space-y-3 lg:hidden">
        {serviceDetails.map((service) => {
          const serviceId = slugify(service.title);
          const isActive = activeService === serviceId;
          const panelId = `${serviceId}-mobile-panel`;

          return (
            <article
              key={service.title}
              className={`overflow-hidden rounded-[1.5rem] border bg-[#11100d]/86 transition duration-200 ${
                isActive ? "border-gold/45" : "border-white/10"
              }`}
            >
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActiveService(serviceId)}
                className="group flex w-full items-start gap-3 px-4 py-4 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full transition ${
                    isActive ? "bg-gold text-ink" : "bg-gold/10 text-gold-soft"
                  }`}
                  aria-hidden="true"
                >
                  <CapabilityIcon icon={service.icon} className="size-4 text-current" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold leading-6 text-white">
                    {service.title}
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-5 text-gold-soft/90">
                    {service.positioning}
                  </span>
                </span>
                <span
                  className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full border text-lg leading-none transition ${
                    isActive
                      ? "border-gold/45 text-gold-soft"
                      : "border-white/10 text-white/55 group-hover:border-gold/35 group-hover:text-gold-soft"
                  }`}
                  aria-hidden="true"
                >
                  {isActive ? "−" : "+"}
                </span>
              </button>

              {isActive ? (
                <div id={panelId} className="border-t border-white/10 px-4 pb-5 pt-5">
                  <ServiceDetailBlocks service={service} />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="hidden min-w-0 gap-8 lg:grid lg:grid-cols-[0.34fr_1fr] lg:gap-14">
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] border border-white/10 bg-[#11100d]/82 p-4 sm:p-5">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
            Operating system
          </p>
          <nav
            className="mt-5 flex min-w-0 max-w-full gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            aria-label="Service capabilities"
          >
            {serviceDetails.map((service) => {
              const serviceId = slugify(service.title);
              const isActive = activeService === serviceId;

              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => scrollToService(serviceId)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex w-[15rem] shrink-0 items-center gap-4 rounded-full px-4 py-3 text-left text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink lg:w-auto lg:rounded-2xl ${
                    isActive
                      ? "bg-gold text-ink"
                      : "bg-white/[0.035] text-white/72 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition ${
                      isActive
                        ? "bg-black/15 text-ink ring-1 ring-black/10"
                        : "bg-gold/10 text-gold-soft group-hover:bg-gold/15"
                    }`}
                    aria-hidden="true"
                  >
                    <CapabilityIcon
                      icon={service.icon}
                      className={`size-4 ${
                        isActive
                          ? "text-ink group-hover:text-ink"
                          : "text-gold-soft group-hover:text-gold-soft"
                      }`}
                    />
                  </span>
                  <span>{service.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 space-y-6">
        {serviceDetails.map((service) => {
          const serviceId = slugify(service.title);

          return (
            <article
              key={service.title}
              id={serviceId}
              ref={(node) => {
                sectionRefs.current[serviceId] = node;
              }}
              className="scroll-mt-28 rounded-[2.25rem] border border-white/10 bg-[#11100d]/90 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-gold/35 sm:p-7 lg:p-9"
            >
              <div className="grid gap-8 xl:grid-cols-[0.42fr_1fr] xl:gap-14">
                <div className="max-w-xl">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gold/10 text-gold-soft">
                    <CapabilityIcon icon={service.icon} className="size-6 text-current" />
                  </div>
                  <h2 className="mt-7 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-xl font-semibold leading-7 text-gold-soft">
                    {service.positioning}
                  </p>
                </div>

                <ServiceDetailBlocks service={service} />
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </>
  );
}

function ServiceDetailBlocks({ service }: { service: (typeof serviceDetails)[number] }) {
  return (
    <div>
      <p className="max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
        {service.description}
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-[1fr_0.72fr] lg:mt-8 lg:gap-5">
        <div className="rounded-[1.5rem] bg-[#0b0b0b]/70 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            What it includes
          </h3>
          <ul className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between rounded-[1.5rem] bg-[#0b0b0b]/70 p-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Best for
            </h3>
            <p className="mt-5 text-sm leading-6 text-muted">{service.bestFor}</p>
            {service.relatedServices ? (
              <>
                <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  Related services
                </h3>
                <p className="mt-4 text-xs font-semibold uppercase leading-6 tracking-[0.16em] text-white/62">
                  {service.relatedServices}
                </p>
              </>
            ) : null}
          </div>
          <ButtonLink href="/contact" variant="secondary" className="mt-7 w-full">
            Start a Project
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
