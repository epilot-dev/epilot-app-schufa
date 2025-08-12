import { Box, Heading } from "@epilot/core-ui"

export const NoResultAvailable = () => {

    return <Box>
        <Heading as="h1">
            No results available
        </Heading>

        <Box>
            Please try again later or contact support if the issue persists.
        </Box>
    </Box>
}