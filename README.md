# ROEPrints

## Application to display print jobs that are currently printing or ready to be pulled.

(React - Vite)

ToDo

- reasses need for switch statement in CarbonAPI element. may be redundant.

- deal with overflowing content
- transition APIKey and URL to environment variables
- separate API call and data processing into separate components
- sort job array for finishing and finished jobs (base off of time job finished?). printing already good

- when switching to finished from printing, job name is delayed (still shows previously finished job)
- reformat finishing prints. place at top of printing container again but display "finishing" in place of jobName? would solve above issue.
