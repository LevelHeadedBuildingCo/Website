import { ButtonLink, PageHero } from '../components/ui';

export function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page isn’t level.">
      We couldn’t find the page you were looking for. It may have moved, or the link may be out of date.
      <div className="btn-row mt-2">
        <ButtonLink to="/" arrow>Back to home</ButtonLink>
        <ButtonLink to="/contact" variant="outline">Contact us</ButtonLink>
      </div>
    </PageHero>
  );
}
